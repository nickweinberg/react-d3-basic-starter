/** @jsx React.DOM */
// ... React components inside here
var Chart = React.createClass({
  render: function() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}>
        {this.props.children}
      </svg>
    );
  }
});

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },
  render: function() {
    return (
      <rect
        fill={this.props.color}
        width={this.props.width}
        height={this.props.height}
        x={this.props.offset}
        y={this.props.availableHeight - this.props.height} />
      );
  }
});

var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },
  render: function() {
    var props = this.props;

    var yScale = d3.scale.linear()
                   .domain([0, d3.max(this.props.data)])
                   .range( [0, this.props.height]);


    var xScale = d3.scale.ordinal()
                   .domain(d3.range(this.props.data.length))
                   .rangeRoundBands([0, this.props.width], 0.05);

    var bars = _.map(this.props.data, function(point, i) {
      return (
        <Bar
          height={yScale(point)}
          width={xScale.rangeBand()}
          offset={xScale(i)}
          availableHeight={props.height}
          color={props.color}
          key={i} />
        );
    });

    return (<g>{bars}</g>);
  }
});

var BarChart = React.createClass({
  render: function() {
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries
          data={this.props.data}
          width={this.props.width}
          height={this.props.height}
          color={chartColor} />
      </Chart>
    );
  }
});

var RandomizerButton = React.createClass({
  render: function() {

    return (<button onClick={this.props.clickHandler}>Go!</button>);
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      data: [1,5,30,2,9,15,19],
      width: 600,
      height: 300
    }
  },

  getRandomData: function() {
    var newChartData = _.range(25)
                 .map(function() {
                    return _.random(1,30);
                 });
    this.setState({data: newChartData});
  },
  render: function() {
    return(
      <div>
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
        <RandomizerButton clickHandler={this.getRandomData} />
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('container')
);