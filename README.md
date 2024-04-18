# Offre HUMAN


## Documentation

Toute la documentation est accessible depuis le lien suivant :  
http://pad-st.cnamts.fr/pad-ddst/fabricant/dait/sk-vue/fiche-resume.html


## Configuration

Ce starterkit doit etre utilisé avec yarn 1.22.19 et node v14.18.3 minimum pour garantir sa compatibilité avec la PIC.  


``` bash
# Pre-install
$ yarn global add @vue/cli

# Install dependencies (without update dependencies)
$ yarn install --frozen-lockfile

# Test unit
$ yarn run test:unit

# Test e2e avec cypress depuis son interface
$ yarn run test:e2e:gui

# Test e2e avec cypress avec rapport en console
$ yarn run test:e2e

# Lint & fix
$ yarn run lint

# Serve with hot reload
$ yarn run serve

# Build for production
$ yarn run build
```

### Variables du package.json

Le package.json comporte un champ `name` et un champ `version` qui sont lus par l'application Vue pour ne déduire le code module et la version du module.

Le `name` doit comporter dans ses 4 premiers caractères, les 4 lettres du code module.

Ces informations permettent d'ajouter des headers dans les requêtes sortantes, pour identifier l'origine des requêtes côté serveur.

#### Identifiant de corrélation

Un autre header est automatiquement ajouté aux requêtes sortantes : un identifiant de corrélation. Cet identifiant (sous forme d'UUID4) est unique pour chaque requête, et peut être incorporé dans les logs serveur pour faire correspondre chaque requête front avec son log back.

### Exemple de cas d'usage

Combiné à un `yarn run serve` dans une seconde invite de commandes, vous pouvez ensuite utiliser le bouton "Recevoir une réponse 401" sur la page d'accueil pour envoyer une requête qui recevra une 401.

## Bonnes pratiques

### Outillage

Nous vous préconisons d'utiliser Visual studio code pour vos développements

- https://code.visualstudio.com/

Pour encore faciliter le développement, les extensions suivantes sont à installer :

- Vetur v0.35.0
- Eslint v2.2.2

### Gestion des commits

#### Préconisations générales

- **Ne jamais utiliser la commande merge** (à l'exception du fast-forward et de ceux réalisés par Gitlab)
  - Le code est remis à niveau via rebase sur la tête de la branche parente
    - Au choix, un gros à rebase la fin, ou des petits rebases successifs en cours de route
  - De cette manière, la personne qui développe est **porteuse de la responsabilité de résolution des conflits** avec le code qui existait déjà
  - Squash / Fixup un maximum de commits avant de merger sur la branche parente
    - Viser **un seul commit final**. Possibilité de viser 2 ou 3 si la complexité de la feature le nécessite, **et la bonne compartimentalisation des commits le permet**
- Se mettre d'accord sur le langage des commit dans le projet
- Se mettre d'accord sur les acronymes utilisés dans le projet
  - Qui peuvent être dans un autre langage, puisqu'au final ce ne sont que des artefacts arbitraires représentant des concepts.
  - Quelques exemples communs :
    - `WIP` - Work In Progress
    - `MR` - Merge Request
    - `TU` - Tests Unitaires
    - `TI` - Tests d'Intégration
- S'assurer que l'équipe sait faire des commits multilignes (ligne de commande, client lourd comme Sourcetree etc)
- S'assurer que l'équipe sait **amender** un message de commit existant
- S'assurer que l'équipe sait préserver les messages de commit existants lors des rebases, notamment pour que cela soit préservé aussi lors de la complétion d'une Merge-Request
  - Les versions les plus récentes de Gitlab permettent de personaliser le message de commit final sur la page de la MR
  - Les versions antérieures de Gitlab (comme le Gitlab HD par exemple) vont prendre le premier message de commit comme base pour le message final lorsqu'un squash est réalisé
- Ne pas commiter **trop souvent**
  - Cela introduit du bruit dans l'arbre et décourage sa lecture
- Ne pas commiter **trop rarement**
  - Même si le commit idéal comprends une et une seule petite feature complète, en pratique cela n'est pas si fréquent
  - Si les changements prennent plus de temps que nécessaire à réaliser, ne pas hésiter à **commiter le soir** avant de partir en utilisant le tag "WIP". Cela limite les risques de perte de code en cas de problème matériel / erreur humaine / vol / incendie
  - Si le travail est trop complexe, ne pas hésiter à le sous-diviser en plusieurs commits
    - Cela permet aussi de structurer sa réflexion autour des changements à réaliser, pour les grouper et compartimentaliser
- Utiliser un **outil de visualisation de l'arbre git** (Par exemple Sourcetree, ou au pire Gitlab via le menu `Repository` -> `Graph`)
  - Lorsque l'on arrête de commiter 30 fois par jour et par personne, visualiser l'arbre devient une possibilité
  - Cela permet de mieux comprendre l'historique des modifications et de mieux visualiser les raisons des conflits (et donc de mieux les résoudre sans introduire de régressions)
- L'extension vscode `Gitlens` est recommandée (Ne pas hésiter à s'approprier les boutons `<-o`, `-o-`, `-o>` de parcours des révisions en haut à droite)

**Pour les préconisations "Entête" et "Corps du commit" ci-dessous, il ne faut pas voir ces préconisations comme une checklist à respecter absolument.**

Il faut plutôt chercher à embarquer un maximum de ces éléments, en maximisant la pertinence du texte du commit.

#### Entête

L'entête est la partie la plus importante du commit. C'est la première ligne de celui-ci, et celle qui sera visible dans la plupart des écrans sur les outils gits.

- L'entête doit être court
  - Mais si le commit est complexe, il vaut mieux dépasser un peu plutôt que de faire un entête peu pertinent
  - **La limite de 72 caractères revient souvent, mais elle dépend en fait des outils utilisés par l'équipe**
    - Par exemple, sur Sourcetree sur un écran 1080p, on peut visualiser environ 230 caractères par ligne
    - Gitlab met une éllipse après 82 caractères
- L'entête doit décrire le **contenu** du commit (La tâche / feature / correction / FT associée)
  - La priorité est d'utiliser l'entête pour comprendre ce que contient le commit.
  - Si besoin de référence la feature / tâche / FT, privilégier un identifiant, plus une description synthétique, plutôt que de simplement recopier le titre entier
- L'entête ne parle pas du raisonnement derrière le commit, **pas de justifications ni d'excuses**
  - Sauf si tout rentre dans un entête de taille raisonnable
- **L'entête doit apporter des informations qu'un outil git ne peut pas apporter**
  - Par exemple : `Modification du HttpService et ajout de tslint.json` est un message de commit *qui a l'air bon*, mais n'a **aucune plus-value**
  - Ce type de description est un piège fréquent lorsque l'équipe souhaite respecter les préconisations mais ne les as pas retenues ou n'a pas saisi leur utilité
- Penser à la ponctuation
  - Il est commun d'être avare sur les caractères, pour oublier de remettre de la ponctuation quand il s'avère qu'il reste quelques caractères de libre

#### Corps du commit

Ce n'est pas parce que l'entête est important qu'il ne faut pas mettre de texte dans le corps du commit !

- Le corps peut être multilignes, aéré avec des retours à la ligne, des listes à puces etc...
- C'est ici que l'on détaille le raisonnement et les éventuelles justifications pour certains choix qui peuvent être discutés
- Le corps peut également lister les petites modifications périphériques qui ne sont pas mentionnées dans l'entête
  - C'est à chaque équipe de déterminer si des changements périphériques doivent être mis dans un commit à part
    - Pour : Périmètre de chaque commit plus clair
    - Pour : Évite les risques d'avoir une seconde feature émerger dans le contenu d'un commit
    - Contre : Ajout de bruit sur l'arbre git avec des commits trop petits
    - Contre : Risque d'oublier d'extraire certains changements périphériques
    - Contre : Difficile d'extraire les changements secondaires qui sont sur un même fichier que les changements principaux.

#### Exemples concrets

Plutôt que de montrer des exemples parfaits, prenons des exemples réels qui ont essayé de maximiser le respect des règles tout en maximisant la pertinence du texte du commit.

**Exemple de commit intermédiaire sur une feature trop complexe pour être réalisée en un seul commit :**

```commit
Overflow taches OK. Amélioration en cours TI pour réinitialiser le store
```

**Exemple sur une feature complexe et des changements périphériques :**

```commit
Première version du tableau, qui affiche les rows dynamiquement

Code :
- Requête fonctionnelle
- GetStatut fonctionnel
- Mise à jour de GetStatut.ts (suppression des async await + traitement des données reçues en réponse)
- Rajout d'une condition dans le cas où StatusList est invalide

Tests :
- Ajout des packages sinon et sinon-chai
- Ajout de test pour getStatus
- Modification URL padkService
```

**Exemple de commit avec un mauvais message (a l'air bon, mais n'apporte aucune information) :**

```commit
Modification du HttpService et ajout de tslint.json
```
