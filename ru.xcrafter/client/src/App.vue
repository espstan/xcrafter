<template>
  <div class="container">
    <Header />
    <Cards />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Cards from './components/Cards.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header,
    Cards,
    Footer
  }
}
</script>

<style>
.container {
  display: grid;
  grid-template-rows: 85px auto 85px;
  height: 100vh;

}
</style>
