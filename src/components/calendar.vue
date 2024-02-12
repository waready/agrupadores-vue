<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <date-picker v-model="selectedDateA" :value="selectedDateA" :disabledDates="disabledDates"
                    :initialDate="initialDate" inline="true" language="es" :calendar-class="customCalendarClassA">
                    <!-- <template v-slot:belowDate>
                        <p class="text-center font-weight-bold">APERTURA CORE</p>
                    </template> -->
                    <template v-slot:formatDateTopBar>
                        <h4 class="text-center">APERTURA CORE</h4>
                        <p class="letra"><i class="far fa-calendar-alt"></i> {{ formattedDate }}</p>
                    </template>
                </date-picker>
            </div>
            <div class="col-md-3">
                <date-picker v-model="selectedDateC" :value="selectedDateC" :disabledDates="disabledDates"
                    :initialDate="initialDate" inline="true" language="es" :calendar-class="customCalendarClassC">
                    <template v-slot:belowDate>
                        <p class="text-center font-weight-bold">CIERRE CORE</p>
                    </template>
                </date-picker>
            </div>
            <div class="col-md-3">
                <date-picker v-model="selectedDate7x24A" :value="selectedDate7x24A" :disabledDates="disabledDates"
                    :initialDate="initialDate" inline="true" language="es" :calendar-class="customCalendarClass7X24A">
                    <template v-slot:belowDate>
                        <p class="text-center font-weight-bold">APERTURA 7X24</p>
                    </template>
                </date-picker>
            </div>
            <div class="col-md-3">
                <date-picker v-model="selectedDate7x24C" :value="selectedDate7x24C" :disabledDates="disabledDates"
                    :initialDate="initialDate" inline="true" language="es" :calendar-class="customCalendarClass7X24C">
                    <!-- <template v-slot:belowDate>
                        <p class="text-center font-weight-bold">CIERRE 7X24</p>
                    </template> -->
                    <template v-slot:formatDateTopBar>
                        <h4 class="text-center">CIERRE 7X24</h4>
                        <p class="letra"><i class="far fa-calendar-alt"></i>  {{ formattedDateC }}</p>
                    </template>
                </date-picker>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from "vuejs3-datepicker";

export default {
    components: {
        DatePicker
    },
    props: ["fechaA", "fechaC", "fecha7x24A", "fecha7x24C"],
    data() {
        return {
            selectedDateA: (() => {
                const fecha = new Date(this.fechaA);
                fecha.setDate(fecha.getDate() + 1);
                return fecha;
            })(),
            selectedDateC: (() => {
                const fecha = new Date(this.fechaC);
                fecha.setDate(fecha.getDate() + 1);
                return fecha;
            })(),
            selectedDate7x24A: (() => {
                const fecha = new Date(this.fecha7x24A);
                fecha.setDate(fecha.getDate() + 1);
                return fecha;
            })(),
            selectedDate7x24C: (() => {
                const fecha = new Date(this.fecha7x24C);
                fecha.setDate(fecha.getDate() + 1);
                return fecha;
            })(),
            disabledDates: {
                // to: new Date(),
                // // Ejemplo para deshabilitar fechas en el futuro
                // from: new Date()
            },
            customCalendarClassA: { "custom-backgroundA": true },
            customCalendarClassC: { "custom-backgroundC": true },
            customCalendarClass7X24A: { "custom-background7x24A": true },
            customCalendarClass7X24C: { "custom-background7x24C": true }

        };
    },
    computed:{
        formattedDate (){
            return this.fechaA;
        },
        formattedDateC (){
            return this.fecha7x24C;
        }
    }
};
</script>

<style>
.custom-backgroundA .vuejs3-datepicker__calendar-topbar {
    background-color: #00c6da;
}

.custom-backgroundA .cell.selected {
    background-color: #00c6da;
}

.custom-backgroundA .cell.selected:hover {
    background-color: #00c6da;
    /* Mantener el color de fondo predeterminado */
}

.custom-backgroundA .vuejs3-datepicker__calendar-topbar-year{
    display: none;
}

.custom-backgroundC .vuejs3-datepicker__calendar-topbar {
    background-color: #00a6f9;
}

.custom-backgroundC .cell.selected {
    background-color: #00a6f9;
}

.custom-backgroundC .cell.selected:hover {
    background-color: #00a6f9;
    /* Mantener el color de fondo predeterminado */
}


.custom-background7x24A .vuejs3-datepicker__calendar-topbar {
    background-color: #ff3e7d;
}

.custom-background7x24A .cell.selected {
    background-color: #ff3e7d;
}

.custom-background7x24A .cell.selected:hover {
    background-color: #ff3e7d;
    /* Mantener el color de fondo predeterminado */
}

.custom-background7x24C .vuejs3-datepicker__calendar-topbar {
    background-color: #7438b9;
}

.custom-background7x24C .cell.selected {
    background-color: #7438b9;
}

.custom-background7x24C .cell.selected:hover {
    background-color: #7438b9;
    /* Mantener el color de fondo predeterminado */
}

.custom-background7x24C .vuejs3-datepicker__calendar-topbar-year{
    display: none;
}


.vuejs3-datepicker__calendar .cell.day-header {
    display: none;
}

.letra{
    font-size: 15px;
}

/* Media query para pantallas mayores a 767px */
@media screen and (min-width: 768px) {
    .vuejs3-datepicker__calendar {
        width: 183px;
    }
}
</style>