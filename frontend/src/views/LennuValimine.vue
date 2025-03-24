<template>
    <div class ="lennu-nimekiri">
    <HeaderComponent />
    <!-- filtreerimise sektsioon-->
    <h2>Filtreeri lende</h2>


    <!--Sihtkoht-->
    <label> Sihtkoht</label>
    <select v-model="filtreeriSihtkohad" >
        <option value=""> Kuhu iganes</option>
        <option v-for="sihtkoht in sihtkohad" :key="sihtkoht" :value="sihtkoht">
            {{ sihtkoht }}
        </option>
    </select>

    <!--Kuupäev-->
    <label>Kuupäev</label>
    <input v-model="filter.date" type="date">

    <!--Hinna vahemik-->
    <label>Hinnavahemik</label>
    <span>
    ${{ filter.minPrice }} - ${{  filter.maxPrice }}
</span>
    <input
        v-model.number ="filter.minPrice"
        type="range"
        :min="minAvailablePrice"
        :max="maxAvailablePrice"
        >
    <input
        v-model.number = "filter.maxPrice"
        type="range"
        :min="minAvailablePrice"
        :max="maxAvailablePrice"
        >

    <ul>
        <li v-for="lend in filteredLennud" :key="lend.id">
            {{  lend.sihtkoht  }} - {{ lend.date }} -${{  lend.hind  }}
        </li>
    </ul>

</div>



</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'LennuValimine',
  components: { HeaderComponent },
  data() {
    return {
      filter: {
        sihtkoht: '',
        date: '',
        minPrice: 0,
        maxPrice: 300,
      },
      lennud: [
        { id: 1, sihtkoht: 'Paris', date: '2025-04-01', hind: 120 },
        { id: 2, sihtkoht: 'Berlin', date: '2025-04-01', hind: 90 },
        { id: 3, sihtkoht: 'Rome', date: '2025-04-02', hind: 150 },
      ],
    };
  },
  computed: {
    sihtkohad() {
      return [...new Set(this.lennud.map((lend) => lend.sihtkoht))];
    },
    minAvailablePrice() {
      return Math.min(...this.lennud.map((lend) => lend.hind));
    },
    maxAvailablePrice() {
      return Math.max(...this.lennud.map((lend) => lend.hind));
    },
    filteredLennud() {
      return this.lennud.filter((lend) => {
        const matchDestination =
          this.filter.sihtkoht === '' || lend.sihtkoht === this.filter.sihtkoht;
        const matchDate =
          !this.filter.date || lend.date === this.filter.date;
        const matchPrice =
          lend.hind >= this.filter.minPrice &&
          lend.hind <= this.filter.maxPrice;

        return matchDestination && matchDate && matchPrice;
      });
    },
  },
};
</script>

<style scoped>
.lennu-nimekiri {
  padding: 20px;
}
</style>