<template>
    <section class="cards">
        <ul class="cards-list">
            <li class="cards-item" v-for="(product, i) in products" :key="i">
                <a :href="product.hrefSearch">
                    <img :src="getImgUrl(product.img)" class="cards-img">
                    <div class="cards-info">
                        <p class="cards-price">{{ product.price }}</p>
                    </div>
                </a>
                <div class="cards-more">
                    <section class="cards-buy" v-on:click="cart +=1">
                        <a><img src="../img/Buy.svg"></a>
                    </section>
                    <section class="cards-search">
                        <a :href="product.hrefSearch"><img src="../img/Search.svg"></a>
                    </section>
                </div>
            </li>
        </ul>
        <div class="cart">
            {{ cart }}
        </div>
    </section>
</template>

<script scoped>
    export default {
        data() {
            return {
                cart: 0,
                products: [
                    {
                        id: '1',
                        img: "Img.png",
                        price: 900,
                        more: 'jiksik',
                        hrefSearch: './',
                        hrefBuy: './'
                    },
                    {
                        id: '2',
                        img: "Img.png",
                        price: 800,
                        more: 'dddddik',
                        hrefSearch: './',
                        hrefBuy: './'
                    },
                    {
                        id: '3',
                        img: "Img.png",
                        price: 700,
                        more: 'fcedsfcsdf',
                        hrefSearch: './',
                        hrefBuy: './'
                    },
                    {
                        id: '4',
                        img: "Img.png",
                        price: 500,
                        more: 'eeeee',
                        hrefSearch: './',
                        hrefBuy: './'
                    },
                    {
                        id: '5',
                        img: "Img.png",
                        price: 700,
                        more: 'ffff',
                        hrefSearch: './',
                        hrefBuy: './'
                    },
                    {
                        id: '6',
                        img: 'Img.png',
                        price: 100,
                        more: 'jiksik',
                        hrefSearch: './',
                        hrefBuy: './'
                    }
                ]
            }
        },
        methods: {
            addToCart: function () {
                this.cart += 1
            },
            getImgUrl(img) {
                const images = require.context('../img/', false, /\.png$/)
                return images('./' + img)
            }
        },

    }
</script>


<style scoped>
    ul, li {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    p {
        margin: 0;
    }

    a {
        cursor: pointer;
    }

    .cards {
        background-color: #C6D6EF;
    }

    .cards-list {
        display: grid;
        grid-gap: 40px 85px;
        grid-template-columns: repeat(auto-fit, 226px);
        grid-auto-rows: 260px;
        margin-left: 85px;
        margin-right: 85px;
        margin-top: 60px;
        margin-bottom: 60px;

    }

    .cards-item {
        background-color: #fff;
        position: relative;
    }

    .cards-img {
        display: block;
        width: 226px;
        height: 260px;
    }

    .cards-info {
        position: absolute;
        background: rgba(198, 214, 239, 0.5);
        height: 68px;
        width: 100%;
        bottom: 0;
        font-weight: bold;
        font-size: 21px;
        text-align: center;
        color: #000000;
    }

    .cards-price {
        padding-top: 20px;
    }

    .cards-price::before {
        position: absolute;
        content: '';
        width: 1px;
        height: 37px;
        background-color: #000000;
        margin-top: -18.5px;
        top: 50%;
        left: 15%;
    }

    .cards-price::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 37px;
        background-color: #000000;
        margin-top: -18.5px;
        top: 50%;
        right: 15%;
    }

    .cards-more {
        display: none;
        position: absolute;
        width: 100%;
        height: 68px;
        bottom: 0;
        background-color: black;
    }

    .cards-item:hover .cards-more {
        display: grid;
        grid-template-rows: 68px;
        grid-template-columns: 1fr 1fr;
    }

    .cards-buy, .cards-search {
        align-self: center;
        justify-self: center;
    }

    .cards-buy:hover, .cards-search:hover, .cards-buy:active, .cards-search:active {
        opacity: 0.5;
    }

    .cards-more::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 44px;
        background-color: #C6D6EF;
        left: 50%;
        margin-left: -0.5px;
        top: 50%;
        margin-top: -22px;
    }
</style>
