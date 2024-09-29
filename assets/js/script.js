$(document).ready(function () {
// Array of product objects
    const products = [
        {
            photo: 'assets/images/shirt1.png',
            name: 'Hoodie',
            category: ['Men', 'Kids'], // Fixed the spelling of 'Kids'
            price: 15.0
        },
        {
            photo: 'assets/images/shirt1.png',
            name: 'Hoodie',
            category: ['Women'],
            price: 15.0
        },
        {
            photo: 'assets/images/shirt2.png',
            name: 'Hoodie',
            category: ['Men'],
            price: 15.0
        },
        {
            photo: 'assets/images/shirt1.png',
            name: 'Hoodie',
            category: ['Men'],
            price: 15.0
        },
        {
            photo: 'assets/images/shirt2.png',
            name: 'Hoodie',
            category: ['Men'],
            price: 15.0
        },
    ];

// Function to render products
    function renderProducts(productArray) {
        $(".row").empty();

        productArray.forEach(product => {
            const productHTML = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="product">
                        <div class="image">
                            <img src="${product.photo}" alt="${product.name}">
                        </div>
                        <div class="details">
                            <h3 class="name">${product.name}</h3>
                            <div class="category-container">
                                ${product.category.map(cat => `<span class="category-box ${getCategoryClass(cat)}">${cat}</span>`).join('')}
                            </div>
                            <h3 class="price">$${product.price.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            `;
            $(".row").append(productHTML);
        });
    }

    function getCategoryClass(category) {
        switch (category.toLowerCase()) {
            case 'men':
                return 'category-men';
            case 'women':
                return 'category-women';
            case 'kids':
                return 'category-kids'; // Fixed case for 'kids'
            default:
                return 'category-default'; // For any new categories
        }
    }

    // Render the initial products from the array
    renderProducts(products);

    // Filtering logic (if you have it implemented)
    $('#categoryDropdownfilter').on('change', function() {
        const selectedCategory = $(this).val();
        
        let filteredProducts;
        if (selectedCategory === 'All' || selectedCategory === '') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.category.includes(selectedCategory)); // Check if selected category is in product categories
        }
        
        renderProducts(filteredProducts);
    });

    // Handle the visibility of Add Product Modal
    $("#addProductModal").css({
        visibility: 'hidden',
        opacity: 0
    });

    $(".btn-success:contains('Add Product')").click(function () {
        $("#addProductModal").css({
            visibility: 'visible',
            opacity: 1
        });
    });

    $(".add-product .close-icon").click(function () {
        $("#addProductModal").css({
            visibility: 'hidden',
            opacity: 0
        });
    });

    // Automatically add selected category as label when chosen from dropdown
    $("#categoryDropdown").change(function () {
        var selectedCategory = $(this).val();
        if (selectedCategory && !$("#selectedCategories").find(`[data-category='${selectedCategory}']`).length) {
            $("#selectedCategories").append(
                `<span class="selected-category" data-category="${selectedCategory}">
                    ${selectedCategory} <span class="delete-category">x</span>
                </span>`
            );
        }
    });

    // Handle category deletion
    $("#selectedCategories").on("click", ".delete-category", function () {
        $(this).parent().remove();
    });

    // Show 'Add New Category' modal when + button is clicked
    $("#addCategoryToProduct").click(function () {
        $("#addCategoryModal").css({
            visibility: 'visible',
            opacity: 1
        });
    });

    // Close the Add Category modal
    $(".add-category .close-icon").click(function () {
        $("#addCategoryModal").css({
            visibility: 'hidden',
            opacity: 0
        });
    });

    // Add new category to dropdown from 'Add Category' modal
    $(".add-category button:contains('Add Category')").click(function () {
        var newCategory = $("#categoryInput").val().trim();
        if (newCategory) {
            // Add new category to the dropdown
            $("#categoryDropdown").append(`<option value="${newCategory}">${newCategory}</option>`);
            $("#categoryDropdownfilter").append(`<option value="${newCategory}">${newCategory}</option>`);
            // Reset input and close the modal
            $("#categoryInput").val('');
            $("#addCategoryModal").css({
                visibility: 'hidden',
                opacity: 0
            });
        }
    });

    // Add new product to the product array and render it
    $(".add-product button:contains('Add Product')").click(function () {
        var productName = $("#productNameInput").val().trim();
        var productPrice = $("#productPriceInput").val().trim();
        var categories = [];

        // Collect selected categories
        $("#selectedCategories .selected-category").each(function () {
            categories.push($(this).data('category'));
        });

        // Get the product image file (if selected)
        var productImage = $("#productImageInput")[0].files[0];
        var imageUrl = productImage ? URL.createObjectURL(productImage) : 'assets/images/default.png';

        // Validate inputs
        if (productName && productPrice && categories.length > 0) {
            // Create a new product object
            var newProduct = {
                name: productName,
                category: categories, // Join categories with comma
                price: parseFloat(productPrice),
                photo: imageUrl
            };

            // Add the new product to the products array
            products.push(newProduct);

            // Render the new product
            const newProductHTML = `
            <div class="col-lg-4 col-md-6 mb-4 d-flex justify-content-center">
                <div class="product">
                    <div class="image">
                        <img src="${imageUrl}" alt="${newProduct.name}">
                    </div>
                    <div class="details">
                        <h3 class="name">${newProduct.name}</h3>
                        <div class="category-container">
                            ${categories.map(cat => `<span class="category-box ${getCategoryClass(cat)}">${cat}</span>`).join('')}
                        </div>
                        <h3 class="price">$${newProduct.price.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        `;

            // Append the new product to the row
            $(".row").append(newProductHTML);

            // Reset modal fields
            $("#productNameInput").val('');
            $("#productPriceInput").val('');
            $("#selectedCategories").empty();
            $("#productImageInput").val(null);
            
            // Hide the modal
            $("#addProductModal").css({
                visibility: 'hidden',
                opacity: 0
            });
        } else {
            alert('Please enter all required details (Product Name, Price, and Categories).');
        }
    });
});
