<template>
    <div class ="lennu-nimekiri">
    <HeaderComponent />
    <!-- filtreerimise sektsioon-->
     <div class="filter-sektsioon">
        <h2 class="sektsiooni-pealkiri">Filtreeri lennud</h2>
    

    <form @submit.prevent="applyFilters" class="filter-form">
        <div class="filter-grid">
        <!--Lähtekoht-->
        <div class ="filter-item">
            <label for="lahtekoht">Lähtekoht</label>
            <select id="lahtekoht" vmodel="form.lahtekoht" class="select-input">
                <option value="">Kust iganes</option>
                <option v-for="lahtekoht in lahtekohad" :key="lahtekoht" :value="lahtekoht">
                    {{ lahtekoht }}
                </option>
            </select>
        </div>

        <!--Sihtkoht-->
        <div class ="filter-item">
            <label for="sihtkoht">Sihtkoht</label>
            <select id="sihtkoht" vmodel="form.sihtkoht" class="select-input">
                <option value="">Kuhu iganes</option>
                <option v-for="sihtkoht in sihtkohad" :key="sihtkoht" :value="sihtkoht">
                    {{ sihtkoht }}
                </option>
            </select>
        </div>

        <!--Kuupäev-->
        <div class="filter-item">
            <label for="date">Kuupäev</label>
            <input id="date" v-model="form.date" type="date" class="date-input">
        </div>

        <!--Lennuaeg-->
        <div class="filter-item">
            <label> Lennuaeg (vahemik)</label>
            <div class="time-range">
                <span class="time-display"> {{ form.varaseimAeg }} - {{ form.hiliseimAeg }}</span>
                <div class="time-inputs">
                    <input type="time" v-model="form.varaseimAeg" class="time-input">
                    <input type="time" v-model="form.hiliseimAeg" class="time-input">
                </div>
            </div>
        </div>

    
        <!--Hinna vahemik-->
        <div class="filter-item">
            <label>Hinnavahemik</label>
            <div class="price-range">
                <span class="price-display"> ${{ form.minHind }} - ${{  form.maxHind }}</span>
                <div class="price-sliders">
                    <label for="min-price">Minimaalne hind</label>
                    <input
                        v-model.number ="form.minHind"
                        type="range"
                        :min="minSaadavHind"
                        :max="maxSaadavHind"
                        class="range-input">
                    <label for="min-price">Maksimaalne hind</label>
                    <input
                        v-model.number ="form.maxHind"
                        type="range"
                        :min="minSaadavHind"
                        :max="maxSaadavHind"
                        class="range-input">
                        
                </div>
            </div>
        </div>
        </div>
        
       <div class="form-actions"></div>
        <button type="submit"> Filtreeri</button>

    </form>
</div>
<!--Lennud-->
<div class="lendude-list-kontainer">
    <h2 class="sektsiooni-pealkiri"> Saadaval lennud</h2>

</div>

<ul class="lendude-list">
    <li v-for="lend in filteredLennud" :key="lend.id" class="flight-item">
        <div class="flight-col">
            <div class="lennu-title">Lähtekoht/Sihtkoht</div>
            {{ lend.lahtekoht }} -> {{ lend.sihtkoht }}
        </div>
        <div class="flight-col">
            <div class="lennu-title">Kuupäev</div>
            {{ lend.date }}
        </div>
        <div class="flight-col">
            <div class="lennu-title">Aeg</div>
            {{ lend.time }}
        </div>

        <div class="flight-col">
            <div class="lennu-title">Hind</div>
            ${{ lend.hind }}
        </div>

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
      form: {
        lahtekoht: '',
        sihtkoht: '',
        date: '',
        varaseimAeg: '00:00',
        hiliseimAeg: '23:59',
        minHind: 0,
        maxHind: 300,
      },
      filter: {lahtekoht: '',
        sihtkoht: '',
        date: '',
        varaseimAeg: '00:00',
        hiliseimAeg: '23:59',
        minHind: 0,
        maxHind: 300,
      },
      lennud: [
      {
          id: 1,
          lahtekoht: 'Tallinn, Eesti',
          sihtkoht: 'Paris',
          date: '2025-04-01',
          time: '08:30',
          hind: 120,
        },
        {
          id: 2,
          lahtekoht: 'Tallinn, Eesti',
          sihtkoht: 'Berlin',
          date: '2025-04-01',
          time: '13:45',
          hind: 90,
        },
        {
          id: 3,
          lahtekoht: 'Tallinn, Eesti',
          sihtkoht: 'Rome',
          date: '2025-04-02',
          time: '19:15',
          hind: 150,
        },
      ],
    };
  },
  methods: {
    applyFilters() {
        this.filter = {...this.form};
    },
  },
  computed: {
    sihtkohad() {
      return [...new Set(this.lennud.map((lend) => lend.sihtkoht))];
    },
    lahtekohad() {
      return [...new Set(this.lennud.map((lend) => lend.lahtekoht))];
    },
    minSaadavHind() {
      return Math.min(...this.lennud.map((lend) => lend.hind));
    },
    maxSaadavHind() {
      return Math.max(...this.lennud.map((lend) => lend.hind));
    },
    filteredLennud() {
      return this.lennud.filter((lend) => {
        const matchLahtekoht =
          this.filter.lahtekoht === '' || lend.lahtekoht === this.filter.lahtekoht;

        const matchSihtkoht =
          this.filter.sihtkoht === '' || lend.sihtkoht === this.filter.sihtkoht;

        const matchDate =
          !this.filter.date || lend.date === this.filter.date;

        const matchPrice =
          lend.hind >= this.filter.minHind &&
          lend.hind <= this.filter.maxHind;

        const matchTime =
          lend.time >= this.filter.varaseimAeg &&
          lend.time <= this.filter.hiliseimAeg;

        return matchLahtekoht && matchSihtkoht && matchDate && matchPrice && matchTime;
      });
    },
  },
};
</script>

<style>
/* Flight listing styles */
.lennu-nimekiri {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Filter section */
.filter-sektsioon {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 32px;
}

.sektsiooni-pealkiri {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.filter-form {
  width: 100%;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Form controls */
label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #555;
}

.select-input,
.date-input,
.time-input {
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.select-input:focus,
.date-input:focus,
.time-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Time range */
.time-range {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.time-display {
  font-size: 14px;
  color: #666;
}

.time-inputs {
  display: flex;
  gap: 10px;
}

/* Price range */
.price-range {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price-display {
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
}

.price-sliders {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Form actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

button[type="submit"] {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #2563eb;
}

/* Flight list */
.koiklennud {
    background: white;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;


}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}


li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.lennu-title {
    font-size: 12px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .time-inputs {
    flex-direction: column;
  }
  
  li {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

</style>