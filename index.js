const width = window.innerWidth;
const height = window.innerHeight;

const csvUrl = [
    'https://gist.githubusercontent.com/',
    'curran/',
    'a08a1080b88344b0c8a7/',
    'raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/',
    'iris.csv',
].join('');

const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
}

const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
    
const main = async () => {
    const data = await d3.csv(csvUrl, parseRow);

    const plot = scatterPlot()
        .width(width)
        .height(height)
        .data(data)
        .xValue((d) => d.petal_width)
        .yValue((d) => d.sepal_length)
        .symbolValue((d) => d.species)
        .margin ({
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        })
        .size((width * 0.5) / 100)

    const columns = [
        'petal_width',
        'sepal_width',
        'petal_length',
        'sepal_length'
    ]
    let i = 0;

    setInterval(() => {
        plot.xValue((d) => d[columns[i % columns.length]]);
        svg.call(plot); 
        i++;
    }, 2000)
}
main();