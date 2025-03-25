<template>
    <div class ="istmete-nimekiri">
    <HeaderComponent />

    <!-- filtreerimise sektsioon-->
    <div class="filter-sektsioon">
        <h2 class="sektsiooni-pealkiri">Vali istme soovid</h2>
    

    <form @submit.prevent="applyIstmeSoovid" class="filter-form">
        <div class="input-kohad">
            <label for="mituKohta">Mitu kohta soovid?</label>
            <input v-model="mituKohta" type="input" id="mituKohta" placeholder="1" required>
        </div>
        <div class ="klassiValik">
            <label for="klassiValik">Vali klass</label>
            <select id="klassiValik" v-model="klassiValik" class="select-input">
                <option value="Esimeneklass">1. Klass</option>
               <option value ="Äriklass">Äriklass</option> 
               <option value ="Turistiklass">Turistiklass</option> 
            </select>
        </div>

        <br>
        <label>
            <input type="checkbox" v-model="aknaSoov" />
            Istekoht akna all
        </label>
        <label>
            <input type="checkbox" v-model="jalaRuum" />
            Rohkem jalaruumi
        </label>
        <label>
            <input type="checkbox" v-model="valjapaasLahedal" />
            Lähedal väljapääsule
        </label>
        <label v-if="Number(mituKohta)> 1">
            <input type="checkbox" v-model="koosIstuda" />
            Soovin, et istekohad oleksid kõrvuti
        </label>
        <div class="form-actions"></div>
        <button type="submit"> Vali</button>
        </form>
        </div>
        


     </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';


export default {
  name: 'IstekohtadeValik',
  components: { HeaderComponent },
  props: {
    lend: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
        mituKohta: 1,
        klassiValik: 'Turistiklass',
        aknaSoov: false,
        jalaRuum: false,
        valjapaasLahedal: false,
        koosIstuda: false,
        submittedSoovid: null,
    };
  },
  methods: {
    applyIstmeSoovid() {
        this.submittedSoovid = {
            mituKohta: Number(this.mituKohta),
            klassiValik: this.klassiValik,
            aknaSoov: this.aknaSoov,
            jalaRuum: this.jalaRuum,
            valjapaasLahedal: this.valjapaasLahedal,
            koosIstuda: this.koosIstuda,
            lennuId: this.id
        }
    }

  }
}

</script>

<style>
/* Overall container */
.istmete-nimekiri {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Section title styling */
.sektsiooni-pealkiri {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Filter section styling */
.filter-sektsioon {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Form styling */
.filter-form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

/* Label styling */
label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #555;
}

/* Input fields styling */
input[type="input"],
.select-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

/* Checkbox containers */
label input[type="checkbox"] {
  margin-right: 8px;
}

/* Submit button (assuming you'll add one) */
button[type="submit"] {
  background-color: #4a6fa5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #3a5a8c;
}

/* Seat map styling (for when you implement SeatMapComponent) */
.seat-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.seat-row {
  display: flex;
  margin-bottom: 5px;
}

.seat {
  width: 40px;
  height: 40px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.seat-available {
  background-color: #e0f7fa;
}

.seat-occupied {
  background-color: #9e9e9e;
  color: white;
  cursor: not-allowed;
}

.seat-selected {
  background-color: #4a6fa5;
  color: white;
}

.seat-recommended {
  background-color: #81c784;
  color: white;
  border: 2px solid #4caf50;
}

/* Seat legend */
.seat-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filter-form {
    grid-template-columns: 1fr;
  }
  
  .seat {
    width: 35px;
    height: 35px;
    font-size: 11px;
  }
}
</style>
