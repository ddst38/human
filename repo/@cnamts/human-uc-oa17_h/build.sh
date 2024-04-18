#!/bin/ksh

#  ==============================================================
#  @(#)CODE ET NOM APPLICATION : DSL_JENKINS
#  @(#)$RCSfile: build.sh,v $
#  @(#)$Revision: 0.1 $
#  @(#)$Name:  build.sh
#  @(#)$Date: 2021/08/04 15:00:00 $
#  @(#)$Author: Stephane LABBE
#  @(#)Libelle : Scripts de compilation globale
#  ---------------------------------------------------------------
#  Description :
#
#  Ce script, execute en automatique par la phase de refabrication du CNQD,
#     doit construire le repertoire liv (cadre national RHEL) pour le module courant
#
#  Il peut utiliser les variables suivantes
#                              CNQD_CVS_LIVREP      repertoire liv
#                              CNQD_CVS_REFERENTIEL referentiel CVS
#                              CNQD_CVS_MODULE      module CVS
#                              CNQD_CVS_LABEL       label CVS
#  Il doit creer le repertoire <code appli><version><type livrable> qui doit
#       etre identique au label CVS
#  Il ne doit pas fabriquer le package de livraison .tar
#
#  ---------------------------------------------------------------


echo "--------------------------------------------------------------------------"
echo "Lancement du build"
echo "--------------------------------------------------------------------------"

# check node version
node -v
# check yarn version
yarn -v

echo "CNQD_CVS_LIVREP=${CNQD_CVS_LIVREP}"
echo "CNQD_CVS_LABEL=${CNQD_CVS_LABEL}"
echo "chemin courant :"
pwd
ls

# création du répertoire de livraison
mkdir -p $CNQD_CVS_LIVREP/$CNQD_CVS_LABEL

# Verification de la Config yarn
yarn config list
yarn config get registry
yarn config get proxy
yarn config get https-proxy
yarn config get cache
echo envvar HTTP_PROXY: $HTTP_PROXY
echo envvar http_proxy: $http_proxy
echo envvar HTTPS_PROXY: $HTTPS_PROXY
echo envvar https_proxy: $https_proxy
echo envvar no_proxy: $no_proxy
echo envvar NO_PROXY: $NO_PROXY

nameprojet=$(grep 'name' package.json | cut -d '"' -f4)
echo "nom projet extrait du package.json : ${nameprojet}"

echo "DEBUG : DEBUT BUILD MODULE"

FILE=yarn.lock
if test -f "$FILE"; then
    echo "$FILE exists."

    if grep -q "registry.npmjs.org" "$FILE"; then
        echo "erreur registry.npmjs.org present dans le fichier yarn.lock"
        return 5 "erreur registry.npmjs.org present dans le fichier yarn.lock."
    else
        if grep -q "registry.yarnpkg.com" "$FILE"; then
            echo "erreur registry.yarnpkg.com present dans le fichier yarn.lock"
            return 5 "erreur registry.yarnpkg.com present dans le fichier yarn.lock."
        else
            echo "fichier valide"

            echo "DEBUG : LANCEMENT installation dependances"
            yarn install --frozen-lockfile 

            if [ $? -ne 0 ] ; then
                echo "DEBUG : INSTALL MODULE FAILED"
                return 5 "yarn installation dependances a echoue."
            else
                echo "DEBUG : LANCEMENT BUILD"
                yarn run build

                if [ $? -ne 0 ] ; then
                    echo "DEBUG : BUILD MODULE FAILED"
                    return 5 "Le build a echoue."
                else
                    echo "DEBUG : BUILD MODULE SUCCEEDED"
                    echo "DEBUG : LANCEMENT PUBLICATION"
                    yarn publish 
                fi
            fi
        fi
    fi

else
    echo "DEBUG : Fichier yarn.lock obligatoire manquant"
	return 5 "Fichier yarn.lock obligatoire manquant."
fi

