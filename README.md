# Bot Discord 

## Bien débuté
- Pré-requis : node TLS (v18.18 actuellement)
- Cloner la branche testing
- Initialiser le projet avec `npm ci`
- Copier/coller le fichier `.env.exemple` et renommé le `.env` puis compléter

## Travailler avec TypeScript
*L'utilisation de TypeScript vous aide à écrire un code plus fiable et mieux documenté.*
Convertir le Typescript en Javascript : `npx tsc`, l'option `--watch` vous permet de ne pas refaire la commande à chaque changement.
Le code executable est généré dans le dossier `dist`

## Fonctionnement des branches
- La branch `Testing` est commune à touts les developpers, tout vos modifications doivent être push sur cette même branch.
- Pour appliquer les modifications sur la Production il faut créer un `Pull request` de `Testing` -> `Main`.
- Avant chaque `Pull request`, bien vérifier que le code modifié fonctionne.

## Préfixes courants pour les messages de commit Git
Les messages de commit Git sont utilisés pour documenter les modifications apportées à un dépôt Git. Pour aider à organiser les modifications et à les identifier plus facilement, il est courant d'utiliser des préfixes dans les messages de commit. Voici quelques préfixes courants et leur signification :

- `feat:` pour une nouvelle fonctionnalité ajoutée
- `fix:` pour une correction de bogue
- `doc:` pour une mise à jour de la documentation
- `refactor:` pour une refonte du code qui ne modifie pas les fonctionnalités
- `test:` pour l'ajout ou la modification de tests
- `style:` pour des modifications qui n'affectent pas le comportement du code (formatage, espaces, etc.)
- `chore:` pour des modifications mineures qui n'affectent pas le code (mise à jour des dépendances, changements de configuration, etc.)

L'utilisation de ces préfixes peut aider à organiser les modifications dans un dépôt Git et à les identifier plus facilement. Il est important de choisir des préfixes qui ont un sens pour votre projet et votre équipe, et de les utiliser de manière cohérente pour garantir la clarté et la lisibilité des messages de commit.

## Versioning
Le versioning est automatique. Il utilise les tag lorsque vous faite un Pull Request.
Label à utilisé:
- Path: correction de bug. exemple `1.0.0` -> `1.0.1`
- Mineur: modification mineur ou ajout de petite fonctionnalité. exemple `1.0.0` -> `1.1.0` 
- Majeur: modifacation significative du code. exemple `1.0.0` -> `2.0.0`

## Deployement
Il est automatique, et fait lorsqu'un Pull Request vers la branche `main` est cloturé.

## Documentations 
- [DiscordJs](https://discord.js.org/#/)
- [Mysql2](https://github.com/sidorares/node-mysql2#installation)
- [Typescript](https://www.typescriptlang.org/)