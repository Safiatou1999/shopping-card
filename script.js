// Fonction qui s'occupe de changer la quantité d'un produit dans le panier
// element : c'est le bouton sur lequel on a cliqué (plus ou moins)
// isIncrease : c'est un booléen (true si on veut augmenter, false si on veut diminuer)
function updateQuantity(element, isIncrease) {
    // On remonte dans le DOM pour trouver la carte du produit, puis on récupère l'élément qui affiche la quantité
    const quantityElement = element.closest('.card').querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent); // On convertit la quantité actuelle en nombre pour pouvoir faire des calculs

    // Si on a cliqué sur le bouton '+', on ajoute 1 à la quantité.
    // Sinon, si on a cliqué sur '-', on enlève 1, mais seulement si la quantité est déjà supérieure à 0 (on ne veut pas de quantité négative).
    if (isIncrease) {
        quantity++;
    } else if (quantity > 0) {
        quantity--;
    }

    // On met à jour l'affichage de la nouvelle quantité dans la page
    quantityElement.textContent = quantity;

    // Comme la quantité a changé, il faut aussi recalculer le prix total du panier
    updateTotalPrice();
}

// Fonction pour supprimer complètement un produit du panier
// element : c'est le bouton poubelle sur lequel on a cliqué
function removeProduct(element) {
    // On demande confirmation avant de supprimer
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
        // On trouve la carte du produit correspondant et on la supprime du DOM
        element.closest('.card').remove();

        // Après suppression, on recalcule le prix total
        updateTotalPrice();
    }
}

// Fonction pour liker ou unliker un produit en changeant la couleur du cœur
// element : c'est le cœur sur lequel on a cliqué
function toggleHeartColor(element) {
    // On ajoute ou on enlève la classe 'liked' pour changer la couleur du cœur
    // Si la classe 'liked' est présente, le cœur est coloré ; sinon, il reste normal
    element.classList.toggle('liked');

    // On affiche un message pour informer l'utilisateur de son action
    if (element.classList.contains("liked")) {
        alert("Vous avez aimé ce produit ❤");
    } else {
        alert("Vous n'aimez plus ce produit ❌");
    }
}

// Fonction pour recalculer et afficher le prix total des produits dans le panier
function updateTotalPrice() {
    let totalPrice = 0;  // On commence avec un total à zéro

    // On parcourt chaque produit présent dans le panier
    document.querySelectorAll('.card').forEach((product) => {
        // On récupère le prix unitaire du produit (sans le signe '$')
        const price = parseFloat(product.querySelector('.unit-price').textContent.replace('$', ''));
        
        // On récupère la quantité de ce produit
        const quantity = parseInt(product.querySelector('.quantity').textContent);

        // On ajoute au total le prix de ce produit multiplié par sa quantité
        totalPrice += price * quantity;
    });

    // On affiche le prix total avec deux décimales, suivi du signe '$'
    const totalElement = document.querySelector('.total');
    totalElement.textContent = totalPrice.toFixed(2) + ' $';

    // Effet de clignotement du total avec changement de couleur
    totalElement.classList.add('blink');
    setTimeout(() => totalElement.classList.remove('blink'), 1500);
}

// Fonction pour ajouter un effet de zoom et de couleur quand on clique sur une image
document.querySelectorAll('.card img').forEach((img) => {
    img.addEventListener('click', () => {
        // On applique une animation de zoom et de changement de couleur
        img.classList.add('image-clicked');
        setTimeout(() => img.classList.remove('image-clicked'), 500);
    });
});

// Cette partie du code s'exécute quand la page est complètement chargée
document.addEventListener('DOMContentLoaded', function () {
    // Pour chaque bouton '+', on ajoute un événement 'click' qui augmente la quantité du produit
    document.querySelectorAll('.fa-plus-circle').forEach((plusButton) => {
        plusButton.addEventListener('click', () => updateQuantity(plusButton, true));
    });

    // Pour chaque bouton '-', on ajoute un événement 'click' qui diminue la quantité du produit
    document.querySelectorAll('.fa-minus-circle').forEach((minusButton) => {
        minusButton.addEventListener('click', () => updateQuantity(minusButton, false));
    });

    // Pour chaque bouton poubelle, on ajoute un événement 'click' qui supprime le produit du panier
    document.querySelectorAll('.fa-trash-alt').forEach((trashButton) => {
        trashButton.addEventListener('click', () => removeProduct(trashButton));
    });

    // Pour chaque cœur, on ajoute un événement 'click' qui change sa couleur pour liker ou unliker
    document.querySelectorAll('.fa-heart').forEach((heartButton) => {
        heartButton.addEventListener('click', () => toggleHeartColor(heartButton));
    });

    // On fait un premier calcul du prix total quand la page est chargée
    updateTotalPrice();
});
