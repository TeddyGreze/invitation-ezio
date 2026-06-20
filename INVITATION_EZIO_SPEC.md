# Spécification V5 — Refonte artistique en fresque jungle continue

Tu travailles sur un projet existant d’invitation web pour le baptême d’Ezio.

Le projet existe déjà en :

* Vite
* React
* TypeScript
* Tailwind CSS

Le site fonctionne déjà. Il ne faut pas recréer le projet depuis zéro.
Il faut améliorer la direction artistique actuelle.

## Contexte

Le site est une invitation web pour le baptême d’Ezio.

Thème :

* carnet d’explorateur ;
* jungle douce ;
* papier ancien ;
* aquarelle vintage ;
* ambiance familiale, élégante, chaleureuse et premium.

Informations importantes :

* prénom : Ezio ;
* date de naissance : 17 mai 2026 ;
* événement : baptême d’Ezio.

Le site sera surtout consulté sur téléphone, donc le rendu mobile reste prioritaire.

## Problème actuel

La version actuelle a commencé à utiliser de grandes images de section, ce qui est une bonne idée.
Cependant, le résultat n’est pas encore satisfaisant.

Les problèmes observés sont :

1. Les images de section ne semblent pas connectées entre elles.
2. Chaque section ressemble à une image indépendante.
3. Il n’y a pas de vraie continuité visuelle du haut vers le bas.
4. Les raccords entre les sections sont trop visibles.
5. Certaines images ont des bords trop clairs ou trop délavés, ce qui casse l’immersion.
6. Les visuels après le hero semblent moins qualitatifs que le hero principal.
7. Les mêmes animaux reviennent trop souvent.
8. La page manque d’un vrai cheminement narratif.
9. Les éléments décoratifs ne racontent pas assez une progression.
10. Le rendu fait encore “blocs empilés” au lieu de “voyage dans une seule jungle”.

## Objectif principal

Je veux une vraie refonte artistique basée sur une fresque verticale continue.

Le site doit donner l’impression que l’utilisateur descend dans une seule grande illustration de jungle, comme un carnet d’explorateur qui se déroule section après section.

Chaque grande section peut avoir son propre visuel, mais tous les visuels doivent sembler appartenir à une seule grande scène continue.

L’effet attendu est :

* une progression naturelle ;
* un cheminement visuel ;
* une jungle qui continue d’une section à l’autre ;
* une cohérence de lumière ;
* une cohérence de végétation ;
* une cohérence de profondeur ;
* une cohérence de palette ;
* une narration visuelle douce.

Le site ne doit plus ressembler à une succession d’images séparées.

## Référence principale

Le hero actuel est la meilleure partie du site.

Il faut le garder comme référence de qualité :

* même niveau de détail ;
* même palette ;
* même douceur ;
* même style aquarelle ;
* même ambiance premium ;
* même équilibre entre papier ancien, jungle et animaux.

Le hero peut être légèrement ajusté si nécessaire, mais il ne faut pas le dégrader.

Les sections suivantes doivent atteindre un niveau visuel proche du hero.

## Nouvelle logique visuelle attendue

Je veux remplacer la logique actuelle par une logique de fresque continue.

La page doit être pensée comme un voyage :

### 1. Hero — L’entrée dans la jungle

Le hero présente Ezio et ouvre l’univers.

Ambiance :

* grande jungle luxuriante ;
* animaux principaux ;
* carnet ancien ;
* découverte ;
* début de l’expédition.

À conserver comme base.

### 2. Journal de bord — Le carnet s’ouvre

Cette section doit sembler être la continuité naturelle du hero.

Elle peut montrer :

* une jungle un peu plus calme ;
* des pages de carnet ;
* des traces de pas ;
* de la végétation qui continue depuis le hero ;
* un ou deux animaux discrets en arrière-plan ;
* une atmosphère plus intime.

Important :
la section ne doit pas avoir l’air d’une nouvelle image posée sous le hero.
Elle doit sembler être le prolongement du décor.

### 3. Plan d’expédition — Le chemin se dessine

Cette section doit faire apparaître l’idée d’itinéraire.

Elle peut montrer :

* une carte ancienne ;
* un chemin en pointillés ;
* des traces de pattes ;
* une boussole ;
* une petite église illustrée ;
* des feuilles qui encadrent le parcours ;
* une végétation qui continue à gauche ou à droite.

Important :
le texte du plan d’expédition doit rester parfaitement lisible.

### 4. Programme — Le parcours dans la jungle

Cette section doit représenter la progression de la journée.

Elle peut montrer :

* un chemin doux qui descend dans la page ;
* des étapes visuelles ;
* des traces d’animaux ;
* une végétation plus dense sur les côtés ;
* des animaux différents, placés discrètement ;
* un effet d’aventure familiale.

La section doit raconter un déplacement, pas juste afficher des cartes.

### 5. Petit mot / Notes — La pause tendre

Cette section doit être plus douce et émotionnelle.

Elle peut montrer :

* une clairière légère ;
* des papillons ;
* des petits oiseaux ;
* un papier scotché ;
* une végétation plus fine ;
* une lumière plus douce.

L’ambiance doit être poétique, pas surchargée.

### 6. Bloc final — La fin de l’expédition

Cette section doit donner une sensation de conclusion.

Elle peut montrer :

* une sortie de jungle ;
* un paysage plus ouvert ;
* une végétation basse ;
* quelques animaux en arrière-plan ;
* des traces qui s’arrêtent ;
* un dernier élément de carnet ou de boussole.

La fin doit être chaleureuse et harmonieuse.

## Continuité obligatoire entre les sections

Les sections doivent être raccordées visuellement.

Utilise des transitions naturelles entre les images :

* feuillages qui dépassent d’une section vers l’autre ;
* dégradés doux ;
* continuité de texture papier ;
* continuité de végétation ;
* chemin ou traces qui se poursuivent ;
* formes similaires d’une section à l’autre ;
* même direction de lumière ;
* même grain visuel ;
* mêmes tons beige / vert / brun.

Évite absolument :

* les ruptures brutales ;
* les grands aplats vides ;
* les bords blancs trop visibles ;
* les images qui s’arrêtent net ;
* les cadres rectangulaires trop évidents ;
* les sections qui semblent collées les unes sous les autres ;
* les visuels avec des extrémités trop claires qui cassent l’immersion.

Si une section utilise une image de fond, elle doit être pensée avec des zones de raccord en haut et en bas.

## Gestion des bords et transitions

Les extrémités des images ne doivent pas être trop blanches, trop floues ou trop délavées.

Je veux des raccords plus professionnels.

Solutions possibles :

* superposer légèrement les sections ;
* utiliser des masques CSS doux ;
* utiliser un dégradé papier subtil ;
* ajouter des feuillages de transition ;
* utiliser un pseudo-élément `::before` ou `::after` pour créer un fondu naturel ;
* créer des bandes de transition illustrées ;
* faire continuer les traces de pattes d’une section à l’autre ;
* garder une texture de papier commune sur toute la page.

L’objectif est que le visiteur ait l’impression de parcourir un seul décor continu.

## Diversité animale

Il faut diversifier fortement les animaux.

Actuellement, on voit trop souvent les mêmes animaux.
Je veux éviter la répétition excessive.

Utilise une sélection plus variée, toujours dans un style doux et élégant.

Animaux possibles :

* lionceau ;
* éléphant ;
* girafe ;
* zèbre ;
* singe ;
* toucan ;
* perroquet ;
* petit oiseau exotique ;
* tortue ;
* gazelle ;
* antilope ;
* rhinocéros doux ;
* hippopotame bébé discret ;
* léopard doux ;
* panthère douce ;
* flamant rose discret si cohérent ;
* caméléon ;
* papillons ;
* libellules ;
* petits oiseaux de jungle.

Important :

* ne pas tout mettre partout ;
* ne pas surcharger ;
* varier les animaux selon les sections ;
* certains animaux doivent être très discrets ;
* éviter les répétitions visibles ;
* utiliser les animaux comme éléments narratifs.

Exemple de répartition :

* Hero : lionceau, éléphant, girafe, zèbre, toucan.
* Journal de bord : perroquet ou petit singe discret.
* Plan d’expédition : tortue, petits oiseaux, traces de pattes.
* Programme : caméléon, papillons, gazelle ou antilope.
* Petit mot : papillons, petit oiseau, feuillage doux.
* Bloc final : animaux éloignés ou silhouettes douces.

Les animaux doivent rester cohérents avec le thème jungle / savane douce.

## Niveau de qualité attendu

Je veux un rendu plus professionnel.

Les visuels doivent être :

* propres ;
* élégants ;
* cohérents ;
* moins bricolés ;
* moins répétitifs ;
* plus immersifs ;
* plus proches d’une invitation premium ;
* plus proches d’une illustration éditoriale ou d’un livre illustré.

Il ne faut pas avoir l’impression que les images ont été générées séparément sans réflexion.

Chaque visuel doit avoir :

* une zone calme pour le texte HTML ;
* des éléments décoratifs bien placés ;
* une profondeur visuelle ;
* un bon équilibre ;
* une continuité avec la section précédente ;
* une continuité avec la section suivante.

## Texte et lisibilité

Tous les textes doivent rester en HTML.

Ne pas générer de texte dans les images.

Les images doivent prévoir des zones calmes où placer le contenu :

* zones plus claires ;
* zones moins détaillées ;
* papier ancien ;
* voile beige ;
* espace négatif.

Le texte doit toujours être prioritaire sur les décorations.

Aucune décoration ne doit gêner :

* les titres ;
* les paragraphes ;
* les boutons ;
* les cartes d’information.

## Photos personnelles

Je ne veux aucune photo de l’enfant ni de la famille.

Ne pas créer :

* zone photo ;
* placeholder photo ;
* cadre photo ;
* galerie ;
* emplacement “Photo d’Ezio”.

Si une zone photo existe encore, elle doit être supprimée ou remplacée par :

* une carte décorative ;
* un texte poétique ;
* une illustration de carnet ;
* une petite scène jungle ;
* une note d’exploration.

## Section RSVP

La section RSVP / formulaire de confirmation ne doit pas revenir.

On peut garder uniquement un petit texte de confirmation dans le contenu, par exemple :
“Merci de confirmer votre présence avant le 1er juin 2026.”

Mais il ne faut pas remettre :

* formulaire ;
* champs de saisie ;
* logique RSVP complète ;
* section de confirmation complète.

## Mobile-first

Le rendu mobile est essentiel.

Sur téléphone :

* les sections doivent rester lisibles ;
* les images doivent être recadrées intelligemment ;
* les animaux ne doivent pas être coupés bizarrement ;
* les décors ne doivent pas cacher le texte ;
* les raccords doivent rester naturels ;
* pas d’overflow horizontal ;
* boutons bien visibles ;
* marges confortables ;
* pas de surcharge.

Il est préférable de prévoir des variantes mobiles des images de section si nécessaire.

Sur mobile, le cheminement doit rester visible, mais plus simple et plus léger.

## Approche technique recommandée

Utilise une architecture propre.

Possibilité de créer un composant de section visuelle réutilisable, par exemple :

* `VisualStorySection`
* `SectionBackdrop`
* `StoryBackground`
* `ContinuousSceneSection`

Chaque section pourrait recevoir :

* une image desktop ;
* une image mobile ;
* une position de fond ;
* un overlay ;
* un niveau d’intensité ;
* un type de transition ;
* le contenu HTML.

Exemple de logique :

* chaque section a une image de fond ;
* chaque section a un overlay papier ;
* chaque section a une zone de contenu ;
* les transitions sont gérées par CSS ;
* les images sont lazy-loadées si elles ne sont pas critiques.

## Assets à créer ou remplacer

Créer ou remplacer les grandes images de section suivantes :

1. `hero-jungle-desktop` et `hero-jungle-mobile`
   À conserver si elles sont déjà réussies, sauf ajustement mineur.

2. `section-journal-desktop` et `section-journal-mobile`

3. `section-plan-desktop` et `section-plan-mobile`

4. `section-programme-desktop` et `section-programme-mobile`

5. `section-notes-desktop` et `section-notes-mobile`

6. `section-final-desktop` et `section-final-mobile`

Chaque image doit être pensée comme une partie de la même fresque verticale.

## Prompts de génération recommandés

Génère les images de section avec une logique de série cohérente.

Important :
chaque prompt doit préciser que l’image est une partie d’une fresque continue.

### Prompt commun à toutes les sections

“Watercolor vintage explorer journal jungle scene, part of a continuous vertical illustrated story for a baby baptism invitation, parchment paper texture, warm beige brown sage green palette, soft premium watercolor, elegant safari jungle atmosphere, coherent lighting, coherent foliage, refined composition, calm empty area for HTML text, no text, no letters, no photo frame, no people, seamless continuation feeling.”

### Journal de bord

“Watercolor vintage explorer journal jungle scene, continuation from the hero section, soft parchment background, lush foliage continuing from above, subtle compass map textures, gentle toucan or small monkey in the background, calm central area for HTML text cards, premium baby baptism invitation style, no text, no letters, no photo frame, seamless top and bottom transition.”

### Plan d’expédition

“Watercolor vintage explorer journal jungle expedition map scene, continuation of the previous section, old map path, paw prints, small illustrated church, compass, tropical foliage framing the scene, soft animals in the background such as turtle or small birds, calm central area for HTML expedition details, parchment texture, premium vintage watercolor, no text, no letters, seamless vertical continuation.”

### Programme

“Watercolor vintage jungle expedition path scene, continuation of the previous section, soft path going down through tropical foliage, paw prints, butterflies, caméléon, gazelle or antelope discreetly placed, explorer journal atmosphere, calm area for HTML timeline cards, parchment texture, warm beige sage green palette, premium watercolor, no text, no letters, seamless top and bottom transition.”

### Notes

“Watercolor vintage jungle clearing scene, tender and poetic pause in a continuous explorer journal story, soft foliage, butterflies, small exotic birds, warm parchment texture, calm central area for a paper note in HTML, elegant baby baptism invitation style, no text, no letters, no photo frame, seamless continuation with previous and next section.”

### Final

“Watercolor vintage explorer journal jungle ending scene, final part of a continuous vertical illustrated story, soft open jungle clearing, gentle distant animals, low foliage, paw prints fading, warm parchment texture, elegant premium baby baptism invitation atmosphere, calm area for final HTML message and buttons, no text, no letters, seamless continuation from above.”

## Important sur la génération

Les images doivent avoir le même style :

* même palette ;
* même texture ;
* même grain ;
* même lumière ;
* même niveau de détail ;
* même direction artistique.

Ne pas générer des images qui semblent venir de styles différents.

Ne pas générer des images trop blanches aux extrémités.
Les raccords doivent être subtils et naturels.

## Travail demandé

1. Analyse la version actuelle.
2. Garde le hero actuel comme référence.
3. Revois toute la stratégie visuelle des sections suivantes.
4. Crée ou remplace les grandes images de section pour qu’elles forment une fresque continue.
5. Supprime l’effet “image indépendante par bloc”.
6. Corrige les transitions trop claires ou mal raccordées.
7. Diversifie les animaux.
8. Supprime toute zone photo restante.
9. Ne remets pas de RSVP.
10. Améliore le mobile.
11. Lance `npm run build`.
12. Corrige les erreurs éventuelles.

## Résultat attendu

Je veux obtenir une invitation qui donne l’impression d’une seule aventure visuelle continue.

Le visiteur doit ressentir :

* qu’il entre dans la jungle avec Ezio ;
* qu’il avance dans un carnet d’explorateur ;
* que chaque section est une étape du même voyage ;
* que les décors sont liés ;
* que les animaux et la végétation évoluent naturellement ;
* que l’ensemble est premium, doux et professionnel.

## Résumé final attendu

À la fin, donne-moi :

1. les composants modifiés ;
2. les images de section créées ou remplacées ;
3. la logique de continuité utilisée ;
4. les animaux ajoutés ou diversifiés ;
5. les corrections apportées aux transitions ;
6. les améliorations mobile ;
7. le résultat de `npm run build`.
