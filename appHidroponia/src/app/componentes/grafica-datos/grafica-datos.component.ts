import { Component, OnInit, Input } from '@angular/core';
import datoRecogido from 'src/app/modelos/datosRecogidos';

@Component({
  selector: 'app-grafica-datos',
  templateUrl: './grafica-datos.component.html',
  styleUrls: ['./grafica-datos.component.css']
})
export class GraficaDatosComponent implements OnInit {
  @Input() datosRecogidos: datoRecogido[] = [];

  datosRecogidosPorMediaDiaria: datoRecogido[] = [];
  datosRecogidosPorDia: datoRecogido[] = [];

  maximo: number = 0;
  minimo: number = 0;

  data: any;
  options: any;

  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary =  this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder =  this.documentStyle.getPropertyValue('--surface-border');

  // Para almacenar el día seleccionado
  diaSeleccionado: Date | null = null;

  constructor() {  }

  inicializaGrafica(datosRecogidos: datoRecogido[]) {
    let mediaDiaria = this.calcularMediaDiaria(datosRecogidos);

    // Obtener un array de strings de las fechas
    const labels = mediaDiaria.map(dato => dato.momento.toDateString());
    const label = mediaDiaria[0].parametro;
    const valores = mediaDiaria.map(dato => dato.valor);

    var color;
    switch (label) {
      case 'temperatura':
        color = this.documentStyle.getPropertyValue('--red-500');
        break;

      case 'humedad':
        color = this.documentStyle.getPropertyValue('--blue-500');
        break;

      case 'luminosidad':
        color = this.documentStyle.getPropertyValue('--yellow-500');
        break;
      case 'pH':
        color = this.documentStyle.getPropertyValue('--purple-500');
        break;

      case 'temp_SN':
        color = this.documentStyle.getPropertyValue('--green-500');
        break;

      default:
        break;
    }

    this.data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: valores,
          fill: false,
          borderColor: color,
          tension: 0.4,
          // Habilitar la captura de clics en los puntos del gráfico
          pointStyle: 'circle',
          radius: 5,
          pointBackgroundColor: color
        }
      ]
    };
  }

  // Método para manejar clics en el gráfico
  onChartClick(event: any) {
    const points = event.chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, true);
    if (points.length > 0) {
      const selectedIndex = points[0].index;
      const fechaSeleccionada = new Date(this.data.labels[selectedIndex]);
      this.diaSeleccionado = fechaSeleccionada;

      // Filtrar datos recogidos del día seleccionado
      this.datosRecogidosPorDia = this.datosRecogidos.filter(dato =>
        this.sonMismoDia(new Date(dato.momento), fechaSeleccionada)
      );
    }
  }

  ordenarPorFecha(array: datoRecogido[]): datoRecogido[] {
    return array.slice().sort((a, b) => new Date(a.momento).getTime() - new Date(b.momento).getTime());
  }

  formatearFechaYYYYMMDD(fecha: Date) {
    return fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
  }

  sonMismoDia(fecha1: Date, fecha2: Date): boolean {
    return (
      fecha1.getFullYear() === fecha2.getFullYear() &&
      fecha1.getMonth() === fecha2.getMonth() &&
      fecha1.getDate() === fecha2.getDate()
    );
  }

  calcularMediaDiaria(datos: datoRecogido[]): datoRecogido[] {
    const datosOrdenados = this.ordenarPorFecha(datos);
    const mediaDiaria: datoRecogido[] = [];

    let diaRecorrido = new Date(datosOrdenados[0].momento);
    let valTotalDiario = 0;
    let numeroDeDatos = 0;

    for (const dato of datosOrdenados) {
      const fecha = new Date(dato.momento);

      if (!this.sonMismoDia(fecha, diaRecorrido)) {
        mediaDiaria.push({
          valor: valTotalDiario / numeroDeDatos,
          parametro: dato.parametro,
          momento: new Date(diaRecorrido)
        });

        diaRecorrido = new Date(fecha);
        numeroDeDatos = 1;
        valTotalDiario = dato.valor;
      } else {
        numeroDeDatos++;
        valTotalDiario += dato.valor;
      }
    }

    return mediaDiaria;
  }

  ngOnInit() {
      this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
              legend: {
                  labels: {
                      color:  this.textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color:  this.textColorSecondary
                  },
                  grid: {
                      color:  this.surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color:  this.textColorSecondary
                  },
                  grid: {
                      color:  this.surfaceBorder,
                      drawBorder: false
                  }
              }
          },

          onClick: (event: any, elements: any) => {
            this.onChartClick(event);
          }
      };
      this.inicializaGrafica(this.datosRecogidos);
  }
}
