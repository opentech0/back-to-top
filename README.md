# Back to top

## Installation

```bash
yarn add @antipodes-medical/back-to-top
```

```javascript
import '@antipodes-medical/back-to-top';
```

## Utilisation

```html

<back-to-top>
    Contenu du back to top
</back-to-top>
```

## Attributs disponibles

### Distance

Rend le bouton visible à une distance spécifiée.

| Name | Type | Default | 
| ---------- | ------ | ------- | 
| `distance` | Number | `800` |

```html

<back-to-top distance="200">
    Contenu du back to top
</back-to-top>
```

### Rounded

Donnez au bouton la forme d'un cercle.

| Name | Type | Default | 
| --------- | ------- | ------- | 
| `rounded` | Boolean | `true` |

```html

<back-to-top rounded="false">
    Contenu du back to top
</back-to-top>
```

## Évènements disponibles

### back-to-top:is-active

Lorsque le bouton est actif.

```javascript
window.addEventListener('back-to-top:is-active', () => console.log('back to top is active'));
```

### back-to-top:is-hidden

Lorsque le bouton est inactif.

```javascript
window.addEventListener('back-to-top:is-hidden', () => console.log('back to top is hidden'));
```

## Styles disponibles

```css
:root {
    /* La largeur du bouton */
    --back-to-top__width: 50px;

    /* La hauteur du bouton */
    --back-to-top__height: 50px;

    /* Le z index du bouton */
    --back-to-top__z-index: 100;

    /* La position à droite de l'écran  du bouton */
    --back-to-top__right: 0;

    /* La position en bas de l'écran du bouton */
    --back-to-top__bottom: 20px;

    /* La couleur d'arrière plan du bouton */
    --back-to-top__background: #000;

    /* La transformation effectuée sur le bouton */
    --back-to-top__transform: translate3d(calc(100% + var(--back-to-top__extra-offset, 0px)), 0, 0)) var(--back-to-top__extra-transform, rotate(0 deg));

    /* La transformation effectuée sur le bouton lorsqu'il est actif */
    --back-to-top__transform--active: translate3d(calc((var(--back-to-top__offset-right, 20px) + var(--back-to-top__extra-offset, 0px)) * -1), 0, 0)) var(--back-to-top__extra-transform--active, var(--back-to-top__extra-transform, rotate(0 deg)));

    /* La couleur d'arrière plan du bouton lorsqu'il est actif */
    --back-to-top__background--active: #FFF;
}   
```"# back-to-top" 
