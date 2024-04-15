<!-- <template>
  <div>
    <PowerBIReportEmbed
      :embedConfig="embedConfig"
      :css-class-name="'reportClass'"
      :phased-embedding="false"
      :event-handlers="eventHandlers"
    ></PowerBIReportEmbed>
  </div>
</template>

<script>
import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
import { BackgroundType } from 'powerbi-client-vue-js';
export default {
  components: {
    PowerBIReportEmbed,
  },
  data() {
    return {
      embedConfig: {
        type: 'report',
        id: '7833de9a-99bd-4a47-af03-8fcc03b3f86b', // Reemplaza con el ID de tu informe
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=7833de9a-99bd-4a47-af03-8fcc03b3f86b', // Reemplaza con la URL de inserción de tu informe
        accessToken: '-D5RuVX6Qg6t9f7MW~gxpw.4baG5Lqem_d', // Reemplaza con tu token de acceso
        //tokenType: 'Embed',
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
          //background: BackgroundType.Transparent,
        },
      },
      eventHandlers: new Map([
        ['loaded', () => console.log('Informe cargado')],
        ['rendered', () => console.log('Informe renderizado')],
        ['error', (event) => console.log(event.detail)],
      ]),
    };
  },
};
</script> -->


<!-- <template>
    <div>
      <PowerBIReportEmbed
        :embedConfig="embedConfig"
        :css-class-name="'reportClass'"
        :phased-embedding="false"
        :event-handlers="eventHandlers"
      ></PowerBIReportEmbed>
    </div>
  </template>
  
  <script>
  import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
  
  export default {
    components: {
      PowerBIReportEmbed,
    },
    data() {
      return {
        embedConfig: {
          type: 'report',
          id: '7833de9a-99bd-4a47-af03-8fcc03b3f86b', // Reemplaza con el ID de tu informe
          embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=7833de9a-99bd-4a47-af03-8fcc03b3f86b', // Reemplaza con la URL de inserción de tu informe
          //embedUrl:"https://app.powerbi.com/groups/fd5c28ca-ed77-4449-9c1e-ae5c07c5c8e0/reports/7833de9a-99bd-4a47-af03-8fcc03b3f86b/ReportSectionc7e06631e6374f98edf1",
          accessToken: '-D5RuVX6Qg6t9f7MW~gxpw.4baG5Lqem_d', // Reemplaza con tu token de acceso
          tokenType: 1,
          settings: {
            //background: 'Transparent',
          },
          // Configuración adicional para autenticación de Service Principal
          authenticationType: 'ServicePrincipal',
          applicationId: 'b01d2524-c2cf-40fe-9de7-88f45038c6eb', // Reemplaza con tu Application ID
          workspaceId: 'fd5c28ca-ed77-4449-9c1e-ae5c07c5c8e0', // Reemplaza con tu Workspace ID
          reportId: '7833de9a-99bd-4a47-af03-8fcc03b3f86b', // Reemplaza con tu Report ID
          applicationSecret: '-D5RuVX6Qg6t9f7MW~gxpw.4baG5Lqem_d', // Reemplaza con tu Application Secret
          tenant: '0bea86de-02f7-425e-9986-9da79de9ab64', // Reemplaza con tu Tenant ID
        },
        eventHandlers: new Map([
          ['loaded', () => console.log('Informe cargado')],
          ['rendered', () => console.log('Informe renderizado')],
          ['error', (event) => console.log(event.detail)],
        ]),
      };
    },
  };
  </script> -->
<template>
  <div>
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
      Launch static backdrop modal
    </button> -->
    <div class="row wrapper border-bottom white-bg content-black">
      <div class="col-sm-3 col-sm-offset-4"></div>
      <div class="col-sm-5 paddingOnHeader">
        <h2 style="text-align: center">
          <button
            style="text-align: center;"
            title="Pantalla completa del dashboard"
            data-toggle="modal" 
            data-target="#staticBackdrop"
            class="btn btn-success btn-sm pull-right button-sgr"
            type="button"
            @click="toggleFullScreen"
          >
            Pantalla Completa
          </button>
        </h2>
      </div>
    </div>
    
    <div style="width: 100%">
      <PowerBIReportEmbed v-if="accessToken" :embedConfig="embedConfig" :css-class-name="'reportClass'"
        :phased-embedding="false" :event-handlers="eventHandlers" style="height: 500px"></PowerBIReportEmbed>
      <div v-else>Cargando...</div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <PowerBIReportEmbed v-if="accessToken" :embedConfig="embedConfig" :css-class-name="'reportClass'"
              :phased-embedding="false" :event-handlers="eventHandlers" style="height: 500px"></PowerBIReportEmbed>
            <div v-else>Cargando...</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { PowerBIReportEmbed } from "powerbi-client-vue-js";
import axios from "axios";

export default {
  components: {
    PowerBIReportEmbed
  },
  data() {
    return {
      accessToken: null, // Inicialmente, el token de acceso se establece en null
      embedConfig: {
        type: "report",
        id: "", // Reemplaza con el ID de tu informe
        embedUrl: "", // Reemplaza con la URL de inserción de tu informe
        accessToken: "",
        tokenType: 1,
        settings: {
          //background: 'Transparent',
        }
      },
      eventHandlers: new Map([
        ["loaded", () => console.log("Informe cargado")],
        ["rendered", () => console.log("Informe renderizado")],
        ["error", (event) => console.log(event.detail)]
      ])
    };
  },
  mounted() {

    // Realiza la solicitud Axios para obtener el token de acceso
    this.fetchAccessToken()
      .then((data) => {
        console.log(data)
        this.embedConfig.accessToken = data.accessToken;
        this.embedConfig.embedUrl = data.embedUrl;
        this.embedConfig.id = data.id;
        this.accessToken = data.accessToken;

      })
      .catch((error) => {
        console.error("Error al obtener el token de acceso:", error);
      });
  },
  methods: {
    fetchAccessToken() {
      // const url = "http://localhost:5300/getEmbedToken";
      const url = "http://10.25.4.10:5300/getEmbedToken";
      return axios.get(url).then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      });
    }
  }
};
</script>
<style>
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  /* Color de fondo */
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-message {
  font-size: 24px;
  color: #333;
  /* Color del texto */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader {
  border: 4px solid #f3f3f3;
  /* Light grey */
  border-top: 4px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  /* Añadir una animación de rotación */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.reportClass {
  border: 2px solid #ccc;
  /* Borde del reporte */
  border-radius: 8px;
  /* Borde redondeado */
  overflow: hidden;
  /* Evita el desbordamiento de contenido */
}
</style>
