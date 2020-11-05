import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BitcoinService } from '../../services/bitcoin.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'exchange-chart',
  templateUrl: './exchange-chart.component.html',
  styleUrls: ['./exchange-chart.component.scss'],
})
export class ExchangeChartComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>()
  public chart: any = {
    title: 'Exchange Trade Volume (USD)',
    type: 'ColumnChart',
    data: null,
    width: '100%'
  }
  public chartOptions: any = {
    color: '#5a81d3',
    backgroundColor: '#b1b1b1',
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
  }
  constructor(
    private bitcoinService: BitcoinService,
    private util: UtilsService
  ) { }

  ngOnInit(): void {
    this.getChartData()
  }
  onResize(ev) {
    this.getChartData()
  }
  getChartData(): void {
    this.bitcoinService.loadChartData()
    this.bitcoinService.chartData$.
      pipe(takeUntil(this.destroy$), map(data => {
        if (data.length === 0) return
        return data.values.map(value =>
          [this.util.formatDate(value.x), value.y])
      })).
      subscribe(data => this.chart.data = data)
  }
}
