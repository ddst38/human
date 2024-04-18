#!/bin/ksh
########################################################################
## Script d'installation automatique pour le Starter Kit SK17        ##
## Execution automatique lors de l'appel du script installLivrable.sh ##
## du cadre super installeur KS_A.                                    ##
## Il doit etre situe a la racine du livrable                         ##
########################################################################

#################
### VARIABLES ###
#################
ERREUR=0
# Le numero de la version se trouve a la fin du LivPath
Version=$(cn_getnomlivrable)

# Repertoire de livraison
LivPath=$LIV/${Version}

# Repertoire d'exploitation
RacineApp=$APP/$USER

# L'ancienne version installee
AncienneVersion=$(cn_getpreclivrable)

# Version du KS
VersionKS=$(cn_getversionks)

if [ "$USER" = "root" ]; then
	echo "Ce script ne peut etre lance en tant que root."
	exit 1
fi

#################
### FONCTIONS ###
#################
function warning {
	ERREUR=1
	echo "[WARNING]$1"
}

function erreur {
	echo "[ERREUR]$1"
	exit 1
}

#################
### PREREQUIS ###
#################
# Creation des repertoires dans l'arborescence d'exploitation s'il n'existe pas deja

##############################################
### GESTION DES FICHIERS DE CONFIGURATIONS ###
##############################################
# cn_confauto # Configuration automatique
#
# if [ $? -ne 0 ]; then 
# 	ERREUR=1
# fi

#############################
### MISE A JOUR DES LIENS ###
#############################
# cn_majlien ${Version}
# if [ $? -ne 0 ]; then 
# 	ERREUR=1
# fi

#############################
### OPERATIONS SPECIFIQUES ##
#############################
static=`echo ${USER} | cut -c1-4` 2>&1
# Creation ou mise a jour du lien symbolique vers le Cadre Applicatif
if [ $(uname -s) = "Linux" ]
then
  # Pour Linux : suppression prealable des liens sur les repertoires
  rm -rf ${CN}/apache/${USER}/appli/${static} 2>&1
fi

if [ ! -d ${CN}/apache/${USER}/appli/ ]
then
  mkdir -p ${CN}/apache/${USER}/appli/
fi
chown -R ${USER}: ${CN}/apache/${USER}/appli

# Creation ou mise a jour du lien symbolique vers le Cadre Applicatif
echo "Creation du lien symbolique vers le Cadre Applicatif"
ln -sfn ${LivPath} ${CN}/apache/${USER}/appli/${static} 2>&1
exit ${ERREUR}
