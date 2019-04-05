<template>
	<header class="nav">
		<section class="logo">
			<img src="../img/Logo.png">
		</section>
		<section class="someone-else">
		</section>
		<section class="basket">
			<a href="./"><img src="../img/Buy.svg"></a>
			<div class="card">
				{{ cart }}
			</div>
		</section>
	</header>
  
</template>

<script>
export default {
	data () {
		return {
			cart: 0,}}
  
}
</script>


<style scoped>

.nav {
	display: grid;
	grid-template-columns: 20% auto 200px;
	background-color: #000;

}

.logo {
	justify-self: center;
	align-self: center;
}

.basket {
	justify-self: end;
	align-self: center;
	padding-right: 85px;
}

.basket:hover, .basket:active {
	opacity: 0.5;
}

.card {
	color: red;
}
</style>
