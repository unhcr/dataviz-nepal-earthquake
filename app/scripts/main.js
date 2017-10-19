
var monthNames = ["Jan", "Feb", "Mar",
	        "Apr", "May", "Jun", "Jul",
	        "Aug", "Sep", "Oct",
	        "Nov", "Dec"];

var dataSources = [
{'name': 'adm1', 'source': 'scripts/geo/topojson/adm1.json'},
{'name': 'adm3', 'source': 'scripts/geo/topojson/adm3.json'},
{'name': 'csv', 'source': 'scripts/geo/data/deaths.csv'},
// {'name': 'deaths', 'source': 'https://dl.dropboxusercontent.com/s/wgra1v9my9buf33/deaths.csv?dl=0'},
// {'name': 'district_pop', 'source': 'https://dl.dropboxusercontent.com/s/4la3pwtlyylwlek/district_population.csv?dl=0'},
{'name': 'world', 'source': 'scripts/geo/topojson/nepalregion2.json'},
{'name': 'districts', 'source': 'scripts/geo/data/affected_districts.csv'},
// {'name': 'usgs', 'source': 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-04-25&maxlatitude=31.09&minlongitude=79.438&minlatitude=25.922&maxlongitude=88.689&minmagnitude=4'},
{'name': 'usgs', 'source': 'scripts/geo/data/usgs.json'},
{'name': 'topline', 'source': 'scripts/geo/data/topline.csv'},
{'name': 'layout', 'source': 'images/layout.svg'},
];

//**************************
// CHECK FOR INTERNET EXPLORER
//**************************
var ie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);
    return v > 4 ? v : undef;
}());

if (ie<=9) {
document.getElementById("loaderContent0").style.display = "block";
throw new Error('Visualisation does not support IE7/8/9');
} else {
document.getElementById("loaderContent1").style.display = "block";
};


//***********************
// INITIALIZE THE LIBRARY
//***********************
var viz = new Vizlib(dataSources, function(data){

	var mapsvg = viz.createSvg({
		div: "#svgContainer", 
		id:'mapsvg', 
		// width: 1000,
		// height: 700,
		'frame': [1,2,3,4,5],
		'aspectRatio': 1.435,
		'downloadButton': false
	});

	//*************************
	// MAP
	//*************************

	var map = viz.map({
		'appendTo': mapsvg, // svg or g d3 object
		'enableRaster': true,
		'center': [84.489614, 28.153341],
		'xOffset': -150, 
		'yOffset': -25, 
		'zoomInit': 15,
		'mapbox': 'matthewsmawfield.31370f48',
		'enableZoomButtons': false,
		'enableZoomMouseScroll': false,
		'enablePan': false,
		'zoomButtonsHtml': '<div class="zoomBox"><div class="zoom zoomIn"></div><div class="zoom zoomOut"></div></div>',
		'zoomInSteps': 1,
		'zoomOutSteps': 1,
		'zoomFactor': 1.5,
		'coordinatesTooltip': true,
		'coordinatesToClipboard': false,
		'frame': [1,2,3,4,5] // if double clicking anywhere on the map, show a popup with the coordinates
	});


	//**************************
	// data cleaning
	//**************************

	$.each(data.csv, function(i,d){
		d.total = parseFloat(d.deaths.replace(/,/g, '')) + parseFloat(d.injured.replace(/,/g, ''));
		d.bars = [parseFloat(d.deaths.replace(/,/g, '')),parseFloat(d.injured.replace(/,/g, ''))];
	});


	//**************************
	// LOAD SVG LAYOUT
	//**************************

	var layout = viz.svgImport({
	    'appendTo': mapsvg,
	    'source': data.layout,
	    'id': 'layout',
	    'layerId': 'Layout',
	});

//**************************
// replace fonts
//**************************

$('tspan').each(function(){
var font = $(this).attr('font-family');

if(font=='OpenSans-Bold'){
$(this).attr('font-family', "'Open Sans', sans-serif;").css('font-weight', 'bold');
}
if(font=='OpenSans-Italic'){
$(this).attr('font-family', "'Open Sans', sans-serif;").css('font-style', 'italic');
}
if(font=='OpenSans'){
$(this).attr('font-family', "'Open Sans', sans-serif;");
}

})

			// mapsvg
			// .append("svg:image")
			// .attr("xlink:href", "./images/logo.png")
			// .attr("width", 125)
			// .attr('class', 'frame frame1 frame2 frame3 frame4 frame5')
			// .attr("height", 38)
			// .attr("x", 5)
			// .attr('y', 1);

			// mapsvg
			// .append("svg:image")
			// .attr("xlink:href", "./images/mapicons/globe.png")
			// .attr("width", 90)
			// .attr('class', 'frame frame1 frame2 frame3 frame4 frame5')
			// .attr("height", 90)
			// .attr("x", 1100)
			// .attr('y', 495);

		// map.append('rect')
		// .attr('x', 100)
		// .attr('y', 100)
		// .attr('width', '100%')
		// .attr('height', 40)
		// .style('fill','#0B57A6');


//**************************
// SOCIAL MEDIA
//**************************

var url = "http://data.unhcr.org/nepal";

d3.select('#socialmedia').selectAll('#icon')
.style('cursor', 'pointer')
.on('mouseover', function(){
	d3.select(this).attr('opacity', 0.8)
})
.on('mouseout', function(){
	d3.select(this).attr('opacity', 1)
});

d3.select('#socialmedia #facebook')
.on('click', function(){
	window.open("https://www.facebook.com/dialog/feed?app_id=694165360698061&link=http%3A%2F%2Fdata.unhcr.org%2Fnepal&picture=http%3A%2F%2Fdata.unhcr.org%2Fnepal%2Fimages%2Fthumbnail.jpg&name=Nepal%20earthquakes%202015&caption=%20&description=Interactive%20data%20visualisation&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F", "_blank");
});

d3.select('#socialmedia #twitter')
.on('click', function(){
	window.open("https://twitter.com/intent/tweet?url="+url+"&text=@Refugees%20%23dataviz%20%23nepalearthquake", "_blank");
});

d3.select('#socialmedia #pinterest')
.on('click', function(){
	window.open("http://pinterest.com/pin/create/button/?url="+url+"&media=http://data.unhcr.org/nepal/images/thumbnail.jpg", "_blank");
});

d3.select('#socialmedia #googleplus')
.on('click', function(){
	window.open("https://plus.google.com/share?&hl=en&url="+url, "_blank");
});

d3.select('#socialmedia #embed')
.on('click', function(){
	console.log('click');
	d3.select('#embedFrame').attr('transform', 'translate(0,800)');
});

d3.select('#closeEmbed')
.style('cursor', 'pointer')
.on('click', function(){
	d3.select('#embedFrame').attr('transform', 'translate(0,-300)');
});


	var worldLayer = map.addVectorPolygon({
	    'source': data.world, 
	    'class': "world",
	    'fillOpacity': 0,
	    'strokeOpacity': 1,
	    'strokeWidth': 2,
	    'strokeColor': '#FFF',
	    'frame': [1,2,3,4,5]
	});

	worldLayer
    .style('fill', function(d){
        if(d.properties.FIPS != 'NP'){
            return '#CACACA';
        } else { 
            return '#CACACA';
        }
    })
    .style('fill-opacity', function(d){
        if(d.properties.FIPS != 'NP'){
            return 0.5;
        } else { 
            return 0;
        }
    }); 

    // MASK

    var maskPath = [
    {name: 'name', lat: 28.168359, lon: 88.700279},
    {name: 'name', lat: 25.937761, lon: 88.612389},
	{name: 'name', lat: 25.982211, lon: 85.382408},
	{name: 'name', lat: 26.779421, lon: 82.701744},
    {name: 'name', lat: 27.420019, lon: 81.130699},//
    {name: 'name', lat: 28.930735, lon: 79.306969},
    {name: 'name', lat: 31.052433, lon: 81.262535},
    {name: 'name', lat: 29.467787, lon: 85.184654},
	];

	var mask = map.addMask({
    'class': 'mapmask', 
    'outline': false, 
    'path': maskPath,
    'frame': [1,2,3,4,5]
	});

    var countryLabels = [
	    {name: 'INDIA', lat: 26.838254, lon: 83.855309},
	    {name: 'CHINA', lat: 29.341252, lon: 85.041832},
	];

	var countryNames = map.addTextLabels({
	    'source': countryLabels,
	    'class': "countryNames",
	    'fontSize': '14px',
	    'fontWeight': 'normal', 
	    'fontFamily': "'Open Sans', sans-serif",
	    'fontColor': '#9e9e9e', 
	    'fontStyle': 'normal', 
	    'textAnchor': 'middle',
	    'xOffset': 8, // offset label horizontally
	    'yOffset': 4, // offset label vertically
	    'opacity': 1,
	    'fade': 0, // fade in labels in miliseconds
	    'delay': 0, // delay showing labels in miliseconds
	    'frame': [1,2,3,4,5]
	});

	var adm1 = map.addVectorPolygon({
	    'source': data.adm1, 
	    'class': "adm1",
	    'fillOpacity': 1,
	    'fill': '#FFF',
	    'strokeOpacity': 1,
	    'strokeWidth': 2,
	    'strokeColor': '#B6B6B6',
	    'frame': [1,2,3,4,5]
	});

    var regionLabels = [
	    {name: 'FAR-WESTERN', lat: 29.376879, lon: 80.898887},
	    {name: 'MID-WESTERN', lat: 28.916311, lon: 82.382042},
	    {name: 'WESTERN', lat: 28.308702, lon: 83.810264},
	    {name: 'CENTRAL', lat: 27.619755, lon: 85.392296},
	    {name: 'EASTERN', lat: 27.151512, lon: 87.248985},
	];

	var regionNames = map.addTextLabels({
	    'source': regionLabels,
	    'class': "regionNames",
	    'fontSize': '13px',
	    'fontWeight': 'normal', 
	    'fontFamily': "'Open Sans', sans-serif",
	    'fontColor': '#9e9e9e', 
	    'fontStyle': 'normal', 
	    'textAnchor': 'middle',
	    'xOffset': 8, // offset label horizontally
	    'yOffset': 4, // offset label vertically
	    'opacity': 1,
	    'fade': 0, // fade in labels in miliseconds
	    'delay': 0, // delay showing labels in miliseconds
	    'frame': [2,3,4,5]
	});

	var adm3 = map.addVectorPolygon({
	    'source': data.adm3, 
	    'class': "adm3",
	    // 'fillOpacity': 0,
	    'fill': 'transparent',
	    'strokeOpacity': 1,
	    'strokeWidth': 0.5,
	    'strokeColor': '#BFBFBF',
	    'frame': [1,2,3,4,5]
	});

	// var severity = map.addVectorPolygon({
	//     'source': data.adm3, 
	//     'class': "severity",
	//     'fillOpacity': 0.5,
	//     'fill': '#FFF',
	//     'strokeOpacity': 0.15,
	//     'strokeWidth': 0.5,
	//     'strokeColor': '#000',
	//     'frame': [2]
	// });

	// severity.style('fill', function(d){

	// 	var severityClass = 'null';

	// 	$(data.districts).each(function(){
	// 		if(this.ocha_pcode==d.properties.pcode){
	// 			severityClass = this.severity_class;
	// 		}
	//     });	

	// 	if(severityClass=='Very Strong'){
	//     	return '#bd0026';
	//     }

	// 	if(severityClass=='Strong'){
	//     	return '#f03b20';
	//     }

	// 	if(severityClass=='Severe'){
	//     	return '#fd8d3c';
	//     }

	//     if(severityClass=='Moderate'){
	//     	return '#fecc5c';
	//     }

	//     if(severityClass=='Light'){
	//     	return '#ffffb2';
	//     }

	//     return '#FFF';

	// });

	// severity
	// .on('mouseover', function(d){
	// 	var dist = d3.select(this)
	// 	.style('fill-opacity', 0.55)
	// 	.style('stroke-opacity', 0.5);

	// 	var severityClass = "No Data";
	// 	var population;
	// 	var name;

	// 	var c = 0;
	// 	$(data.districts).each(function(){
	// 		if(this.ocha_pcode==d.properties.pcode){
	// 			c = 1;
	// 			severityClass = this.severity_class;
	// 			name = d.properties.name;
	// 			population = this.population;
	// 		}
	//     });	

	// 	if(c==1){
	//     $('#districtMouse').show();
	// 	}

	//     $('#dName').html(name);
	//     $('#dSeverityLabel').html(severityClass);
	//     $('#dPopulation').html(population);


	//     if(severityClass=='Very Strong'){
	//     	$('#dBox').css('background-color','#bd0026');
	//     }

	// 	if(severityClass=='Strong'){
	//     	$('#dBox').css('background-color','#f03b20');
	//     }

	// 	if(severityClass=='Severe'){
	//     	$('#dBox').css('background-color','#fd8d3c');
	//     }

	//     if(severityClass=='Moderate'){
	//     	$('#dBox').css('background-color','#fecc5c');
	//     }

	//     if(severityClass=='Light'){
	//     	$('#dBox').css('background-color','#ffffb2');
	//     }

	//     if(severityClass=='No Data'){
	//     	$('#dBox').css('background-color','grey');
	//     }


	// })
	// .on('mouseout', function(){
	// 	d3.select(this)
	// 	.style('fill-opacity', 0.5)
	// 	.style('stroke-opacity', 0.15);

	// 	$('#districtMouse').hide();

	// })
	// .on('mousemove', function(){

	// 	coordinates = d3.mouse(this);
	// 	var x = coordinates[0];
	// 	var y = coordinates[1];

	// 	d3.select('#dM')
	// 	.attr('x', x+5)
	// 	.attr('y', y+5);
	// });


	// // severity legend
	// var severityColor = ['#FFF', '#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
	// var severityClasses = ['No Data', 'Light', 'Moderate', 'Severe', 'Strong', 'Very Strong'];

	// var legXOffset = 20;
	// var legYOffset = 390;

	// var legendSeverity = mapsvg.append('g')
	// .attr('class','legendSeverity frame frame2')
	// .attr('transform', 'translate('+legXOffset+','+legYOffset+')');

	// legendSeverity.append('text')
	// .attr('x', 0)
	// .attr('y', -10)
	// .style('font-family', "'Open Sans', sans-serif")
	// .style('font-weight', 'bold')
	// .style('font-size', '14px')
	// .text('Severity Class');

	// var legendRowHeight = 15;
	// var legendRowWidth = 25;

	// var legendSeverityRow = legendSeverity
	// .selectAll('.legendSeverityRow')
	// .data(severityColor)
	// .enter()
	// .append('g')
	// .attr('transform', function(d,i){return 'translate(0,'+((legendRowHeight+3)*i)+')';});

	// legendSeverityRow
	// .append('rect')
	// .style('stroke','grey')
	// .style('stroke-width',0.5)
	// .attr('width', legendRowWidth)
	// .attr('height', legendRowHeight)
	// .attr('x', 0)
	// .attr('y', 0)
	// .style('fill-opacity', 0.55)
	// .style('fill', function(d,i){
	// 	return severityColor[i];
	// })

	// legendSeverityRow
	// .append('text')
	// .attr('x', 30)
	// .attr('y', 12)
	// .style('font-size', '11px')
	// .style('fill', '#000')
	// .text(function(d,i){
	// 	return severityClasses[i];
	// });




	//********************
	// DEATHS / INJURED 
	//********************


	var killed = map.addVectorPolygon({
	    'source': data.adm3, 
	    'class': "killed",
	    'fillOpacity': 0.7,
	    'fill': '#FFF',
	    'strokeOpacity': 0.15,
	    'strokeWidth': 0.5,
	    'strokeColor': '#000',
	    'frame': [4]
	});

	var injured = map.addVectorPolygon({
	    'source': data.adm3, 
	    'class': "injured",
	    'fillOpacity': 0.7,
	    'fill': '#FFF',
	    'strokeOpacity': 0.15,
	    'strokeWidth': 0.5,
	    'strokeColor': '#000',
	    'frame': [5]
	});

	var totalKilled = d3.sum(data.csv, function(d) { return parseFloat(d.deaths.replace(/,/g, '')); });
	var totalInjured = d3.sum(data.csv, function(d) { return parseFloat(d.injured.replace(/,/g, '')); });
	var maxDate = d3.max(data.csv, function(d) { return d.date });


	// topline figures
	$('#toplinetotal1 tspan').text(addCommas(totalKilled));
	$('#toplinetotal2 tspan').text(addCommas(totalInjured));
	// $('#toplinetitle1 tspan').text((data.topline[0].title));
	$('#deathDate tspan').text('As of ' + getToplineDate(maxDate));
	// $('#toplinetitle2 tspan').text((data.topline[1].title));


	// define range bands
	var legend = d3.scale.threshold()
    .domain([1, 50, 100,250,500,1000,2000,100000])
    .range(['0','1 - 49','50 - 99','100 - 249','250 - 499','500 - 999', '1,000 - 1,999', '2,000+']);

	var color1 = d3.scale.threshold()
    .domain([1, 50, 100,250,500,1000,2000,100000])
    .range(['#FFF','#fee5d9','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d']);

	var color2 = d3.scale.threshold()
    .domain([1, 50, 100,250,500,1000,2000,100000])
    .range(['#FFF','#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801']);


// DEATHS

	var legXOffset = 20;
	var legYOffset = 390;

	var legendKilled = mapsvg.append('g')
	.attr('class','legendKilled frame frame4')
	.attr('transform', 'translate('+legXOffset+','+legYOffset+')');

	legendKilled.append('text')
	.attr('x', 0)
	.attr('y', -10)
	.style('font-family', "'Open Sans', sans-serif")
	.style('font-weight', 'bold')
	.style('font-size', '12px')
	.text('People killed');

	var legendRowHeight = 15;
	var legendRowWidth = 25;

	var legendKilledRow = legendKilled
	.selectAll('.legendKilledRow')
	.data(color1.range())
	.enter()
	.append('g')
	.attr('transform', function(d,i){return 'translate(0,'+((legendRowHeight+3)*i)+')';});

	legendKilledRow
	.append('rect')
	.style('stroke','grey')
	.style('stroke-width',0.5)
	.attr('width', legendRowWidth)
	.attr('height', legendRowHeight)
	.attr('x', 0)
	.attr('y', 0)
	.style('fill', function(d,i){
		return color1.range()[i];
	})

	legendKilledRow
	.append('text')
	.attr('x', 30)
	.attr('y', 12)
	.style('font-size', '11px')
	.style('fill', '#000')
	.text(function(d,i){
		return legend.range()[i];
	});



	killed.style('fill', function(d){

		var deaths = 0;

		$(data.csv).each(function(){
			if(this.OCHA_PCODE==d.properties.pcode){
				deaths = this.deaths;
			}
	    });	

	    return color1(deaths);

	});


	killed
	.on('mouseover', function(d){
		var dist = d3.select(this)
		.style('fill-opacity', 0.8)
		.style('stroke-opacity', 0.5);

		var severityClass = "No Data";
		var deaths = 0;
		var injured = 0;
		var name;

		$(data.csv).each(function(){
			if(this.OCHA_PCODE==d.properties.pcode){
				severityClass = this.severity_class;
				name = d.properties.name;

				if(this.deaths>0){
					deaths = this.deaths;
				} else {
					deaths = 0;
				}

				if(this.injured>0){
					injured = this.injured;
				} else {
					injured = 0;
				}

			}
	    });	

		d3.select('#dM').style('opacity', 1);
		d3.selectAll('.mTitle').text(name);
		d3.selectAll('.mSubTitle1').text('DEATHS');
		d3.selectAll('.mSubTitle2').text('INJURED');
		d3.selectAll('.mFigure1').text(addCommas(deaths));
		d3.selectAll('.mFigure2').text(addCommas(injured));
		d3.selectAll('.mBox1').style('fill', color1(deaths));
		d3.selectAll('.mBox2').style('fill', color2(injured));


	})
	.on('mouseout', function(){
		d3.select(this)
		.style('fill-opacity', 0.7)
		.style('stroke-opacity', 0.15);

		d3.select('#dM').style('opacity', 0)
		.attr('transform', 'translate(-100,-100)');


	})
	.on('mousemove', function(){

		coordinates = d3.mouse(this);
		var x = coordinates[0];
		var y = coordinates[1];

		d3.select('#dM')
		.attr('transform', 'translate('+(x+10)+','+(y+5)+')');

	});

	// INJURED

var legendInjured = mapsvg.append('g')
	.attr('class','legendInjured frame frame5')
	.attr('transform', 'translate('+legXOffset+','+legYOffset+')');

	legendInjured.append('text')
	.attr('x', 0)
	.attr('y', -10)
	.style('font-family', "'Open Sans', sans-serif")
	.style('font-weight', 'bold')
	.style('font-size', '12px')
	.text('People injured');

	var legendRowHeight = 15;
	var legendRowWidth = 25;

	var legendInjuredRow = legendInjured
	.selectAll('.legendInjuredRow')
	.data(color2.range())
	.enter()
	.append('g')
	.attr('transform', function(d,i){return 'translate(0,'+((legendRowHeight+3)*i)+')';});

	legendInjuredRow
	.append('rect')
	.style('stroke','grey')
	.style('stroke-width',0.5)
	.attr('width', legendRowWidth)
	.attr('height', legendRowHeight)
	.attr('x', 0)
	.attr('y', 0)
	.style('fill', function(d,i){
		return color2.range()[i];
	})

	legendInjuredRow
	.append('text')
	.attr('x', 30)
	.attr('y', 12)
	.style('font-size', '11px')
	.style('fill', '#000')
	.text(function(d,i){
		return legend.range()[i];
	});

	injured.style('fill', function(d){

		var deaths = 0;
		var injured = 0;

		$(data.csv).each(function(){

			if(this.OCHA_PCODE==d.properties.pcode){
				injured = this.injured;
			}
	    });	

	    return color2(injured);

	});


	injured
	.on('mouseover', function(d){
		var dist = d3.select(this)
		.style('fill-opacity', 0.8)
		.style('stroke-opacity', 0.5);

		var severityClass = "No Data";
		var deaths = 0;
		var injured = 0;
		var name;

		$(data.csv).each(function(){
			if(this.OCHA_PCODE==d.properties.pcode){
				severityClass = this.severity_class;
				name = d.properties.name;
				
				if(this.deaths>0){
					deaths = this.deaths;
				} else {
					deaths = 0;
				}

				if(this.injured>0){
					injured = this.injured;
				} else {
					injured = 0;
				}

			}
	    });	

		d3.select('#dM').style('opacity', 1);
		d3.selectAll('.mTitle').text(name);
		d3.selectAll('.mSubTitle1').text('DEATHS');
		d3.selectAll('.mSubTitle2').text('INJURED');
		d3.selectAll('.mFigure1').text(addCommas(deaths));
		d3.selectAll('.mFigure2').text(addCommas(injured));
		d3.selectAll('.mBox1').style('fill', color1(deaths));
		d3.selectAll('.mBox2').style('fill', color2(injured));


	})
	.on('mouseout', function(){
		d3.select(this)
		.style('fill-opacity', 0.7)
		.style('stroke-opacity', 0.15);

		d3.select('#dM').style('opacity', 0)
		.attr('transform', 'translate(-100,-100)');

	})
	.on('mousemove', function(){

		coordinates = d3.mouse(this);
		var x = coordinates[0];
		var y = coordinates[1];

		d3.select('#dM')
		.attr('transform', 'translate('+(x+10)+','+(y+5)+')');
	});

	$('#mapAnnotation').attr('class', 'frame frame1');

	// TOP DISTRICTS KILLED

	var topKilled = viz.tableBar({
	    'source': data.csv, 
	    'appendTo': mapsvg, 
	    'id': 'topKilled', 
	    'class': "topKilled",
	    'width': 210,
	    'height': 400,
	    'xOffset': 950,
	    'yOffset': 170,
	    'limit': 15,
	    'title': 'Top 10 Districts',
	    'valueField': 'deaths',
	    'nameField': 'DISTRICT',
	    'fillOpacity': 0.8,
	    'fill': '#cb181d',
	    'frame': [1,2,3,4,5]
	});




	// earthquakes MAP
	var earthquakes = map.addEarthquake({
	    'source': data.usgs,
	    'class': "earthquake", 
	    'opacity': 1,
	    'frame': [1],
	    'fade': 2000, 
	    'delay': 0
	});

	var bubbleChart = viz.bubbleChart({
    'appendTo': mapsvg,
    'source': data.usgs,
    'xOffset': 40,
    'yOffset': 600, 
    'width': 1030,
    'height': 180,
    'fill': '#69D2E7',
    'strokeColor': '#F38630',
    'strokeWidth': 7,
    'opacity': 1,
    'frame': 1
});


	var capitalCities = [
	    {name: 'Kathmandu', lat: 27.7016900, lon: 85.3206000}
	];

	var capitalCity = map.addSymbolPoints({
	    'source': capitalCities,
	    'icon': "./images/mapicons/CountryCapital.svg", 
	    'class': "capital", 
	    'width': 12,
	    'height': 12,
	    'xOffset': 0,
	    'yOffset': 0,
	    'fontSize': 12, 
	    'fontWeight': 'bold', 
	    'fontColor': '#000',
	    'fontFamily': "'Open Sans', sans-serif",
	    'fontStyle': 'normal',
	    'opacity': 1,
	    'frame': [1],
	    'fade': 2000, 
	    'delay': 0,
	    'orientation': 'left'
	});


	var adminCapitalsData = [
	    // {'name': 'Bhaktapur', lat: 27.673031, lon: 85.427856},
	    {'name': 'Pokhara', lat: 28.2668900, lon: 83.9685100},
	];

	var adminCapitals = map.addSymbolPoints({
	    'source': adminCapitalsData,
	    'template': 'admin1capital', 
	    'class': "admin1capital", 
	    'frame': [1],
	    'opacity': 1,
	    'fade': 0, 
	    'delay': 0,
	    'orientation': 'left'
	});

	// var epicentreData = [
	//     // {'name': 'Bhaktapur', lat: 27.673031, lon: 85.427856},
	//     {'name': 'EPICENTRE M7.8', lat: 28.1473, lon: 84.7079},
	// ];

	// var epicentre = map.addSymbolPoints({
	//     'source': epicentreData,
	//     'template': 'epicentre', 
	//     'class': "epicentre", 
	//     'frame': [1],
	//     'opacity': 1,
	//     'fade': 0, 
	//     'delay': 0,
	//     'orientation': 'right'
	// });

	var mountains = [
	    // {'name': 'Bhaktapur', lat: 27.673031, lon: 85.427856},
	    {'name': 'Mount Everest', lat: 27.9881, lon: 86.9253},
	];

	var mountain = map.addSymbolPoints({
	    'source': mountains,
	    'template': 'location', 
	    'class': "location", 
	    'frame': [1],
	    'opacity': 1,
	    'fade': 0, 
	    'delay': 0,
	    'orientation': 'right'
	});

		// mapsvg.append("foreignObject")
  //   .attr("id", 'dM2')
  //   .attr("width", 120)
  //   .attr("height", 130)
  //   .attr("x", 20)
  //   .attr("y", 300)
  //   .style('fill', 'transparent')
  // 	// .append("xhtml:body")
  //   .html('<div id="bubbleTooltip"><b id="bubbleTooltipMag">M7.8</b><br/><div id="bubbleTooltipTime">12.34pm</div></div>');


//**************************
	// TOOLTIPS 
	//**************************
	
		// TOOLTIP 1
 		var bM = mapsvg.append('g')
 		.attr('id', 'dM2')
 		.attr('transform', 'translate(-100,-100)')
 		.style('opacity', 0);

 		bM.append('rect')
 		.attr('width', 110)
 		.attr('height', 35)
 		.style('fill', '#FFF')
 		.style('fill-opacity', 0.8);

 		bM.append('text')
 		.attr('x', 5)
 		.attr('y', 15)
 		.attr('class', 'mTitle')
 		.text('M7.7');

 		bM.append('text')
 		.attr('x', 5)
 		.attr('y', 29)
 		.attr('class', 'mSubTitle1')
 		.text('26 April - 03:20');


		// TOOLTIP 2 population, death, injured
 		var dM = mapsvg.append('g')
 		.attr('id', 'dM')
 		.attr('transform', 'translate(-100,-100)')
 		.style('opacity', 0);

 		dM.append('rect')
 		.attr('width', 110)
 		.attr('height', 90)
 		.style('fill', '#FFF')
 		.style('fill-opacity', 0.8);

 		dM.append('text')
 		.attr('x', 5)
 		.attr('y', 15)
 		.attr('class', 'mTitle')
 		.text('District');

 		dM.append('text')
 		.attr('x', 5)
 		.attr('y', 31)
 		.attr('class', 'mSubTitle1')
 		.text('POPULATION');

 		dM.append('rect')
 		.attr('class', 'mBox1')
 		.attr('x', 5)
 		.attr('y', 37)
 		.attr('height', 10)
 		.attr('width', 3)
 		.style('fill', 'blue');

 		dM.append('text')
 		.attr('x', 12)
 		.attr('y', 46)
 		.attr('class', 'mFigure1')
 		.text('n/a');

 		dM.append('text')
 		.attr('x', 5)
 		.attr('y', 65)
 		.attr('class', 'mSubTitle2')
 		.text('HOUSEHOLDS');

 		dM.append('rect')
 		.attr('class', 'mBox2')
 		.attr('x', 5)
 		.attr('y', 72)
 		.attr('height', 10)
 		.attr('width', 3)
 		.style('fill', 'blue');

 		dM.append('text')
 		.attr('x', 12)
 		.attr('y', 81)
 		.attr('class', 'mFigure2')
 		.text('n/a');



	//*************************
	// KTM MAP
	//*************************

	// var ktmsvg = viz.createSvg({
	// 	div: "#svgContainer", 
	// 	id:'ktmsvg', 
	// 	'frame': [3,4,5],
	// 	'downloadButton': false
	// });

	// var ktmmap = viz.map({
	// 	'appendTo': ktmsvg, // svg or g d3 object
	// 	'enableRaster': true,
	// 	'center': [85.323934, 27.698161],
	// 	'zoomInit': 21,
	// 	'mapbox': 'unhcr.m273d5lg',
	// 	'enableZoomButtons': true,
	// 	'enableZoomMouseScroll': true,
	// 	'enablePan': true,
	// 	'zoomButtonsHtml': '<div class="zoomBox"><div class="zoom zoomIn"></div><div class="zoom zoomOut"></div></div>',
	// 	'zoomInSteps': 3,
	// 	'zoomOutSteps': 1,
	// 	'zoomFactor': 1.5,
	// 	'coordinatesTooltip': true,
	// 	'coordinatesToClipboard': true,
	// 	'frame': [1,2] // if double clicking anywhere on the map, show a popup with the coordinates
	// });

	// var unOfficeData = [
	//     // {'name': 'Bhaktapur', lat: 27.673031, lon: 85.427856},
	//     {name: 'UN House', lat: 27.680399, lon: 85.316117},
	// ];


	// var UNOffice = ktmmap.addSymbolPoints({
	//     'source': unOfficeData,
	//     'template': 'office0', 
	//     'class': "office0", 
	//     'frame': [3],
	//     'opacity': 1,
	//     'fade': 0, 
	//     'delay': 0
	// });

	// var officeData = [
	//     // {'name': 'Bhaktapur', lat: 27.673031, lon: 85.427856},
	//     {name: 'UNHCR', lat: 27.735030, lon: 85.334021},
	// ];

	// var offices = ktmmap.addSymbolPoints({
	//     'source': officeData,
	//     'template': 'office2', 
	//     'class': "office2", 
	//     'frame': [3],
	//     'opacity': 1,
	//     'fade': 0, 
	//     'delay': 0
	// });

	// var campData = [
	//     {name: '', lat: 27.717648, lon: 85.337681},
	//     {name: '', lat: 27.725094, lon: 85.325322},
	//     {name: '', lat: 27.709593, lon: 85.342145},
	// ];

// var openspace = ktmmap.addVectorPolygonPatternFill({
//     'source': data.openspace,
//     'class': "openspace",
//     'lineSpace': 0.5,
//     'strokeWidth': 1.5,
//     'strokeColor': 'darkred',
//     'opacity': 0.8,
//     'fade': 1000,
//     'delay': 0,
//     'frame': [3]
// });
// 	//*****************
// 	// HEXBIN
// 	//*****************

// 	var hexLayer = ktmmap.hexbin({
// 		'source': data.damage,
// 		'layerId': 'HexPoints',
// 		'radius': 15,
// 		'meshStrokeOpacity': 0.4,
// 		'meshStrokeColor': '#FFF',
// 		'hexStrokeOpacity': 0.8,
// 		'hexStrokeColor': '#FFF',
// 		'colorRange': ['#F0B800', '#DD0000'],
// 		'max': 'auto',
// 		'frame': [4]
// 	});

	// var roads = hexmap.addVectorPolygon({
	//     'source': data.roads, 
	//     'class': "roads",
	//     'fillOpacity': 0,
	//     'fill': 'none',
	//     'strokeOpacity': 0.4,
	//     'strokeWidth': 2,
	//     'strokeColor': '#515151',
	//     'frame': [10]
	// });


	// roads
	// .style('stroke-width', function(d){if(d.properties.Class==1){return 4;}else{return 2;}})


	//********************
	// FRAME HANDLER
	//********************
	$('#framePrev, #leftButton').click(function(){
		var f = viz.prevFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(f);
		$('#activeFrame').text(f);
	});
	
	$('#frameNext, #rightButton').click(function(){
		var f = viz.nextFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(f);
		$('#activeFrame').text(f);
	});

    $('.selectFrame').on('click', function(){
        var id = $(this).attr('id');
        var text = $(this).text();
        viz.gotoFrame(id, 1000);
        $('#selectFrame .textlabel').text(text);
		$('#activeFrame').text(id);
    })

    function updateSelect(frame){
    	var text = $('#selectFrameDiv li:nth-child('+(frame)+')').text();
    	$('#selectFrame .textlabel').text(text);
    }

    $('#button3Line, #button4Line').hide();

    $('#button1').click(function(){
		viz.gotoFrame(1,700);
		// var f = viz.nextFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(1);
		$('#activeFrame').text(1);
		$('#button3Line, #button4Line').hide();
		$('#button1Line').show();
	});

 //    $('.button2').click(function(){
	// 	viz.gotoFrame(2,700);
	// 	// var f = viz.nextFrame(700);
	// 	$('#lContent').scrollTop(0);
	// 	updateSelect(2);
	// 	$('#activeFrame').text(2);
	// 	$('.fill1, .fill3, .fill4, .fill5').css('opacity', 0.5);
	// 	$('.fill2').css('opacity', 1);

	// });

    $('.button3').click(function(){
		viz.gotoFrame(3,700);
		// var f = viz.nextFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(1);
		$('#activeFrame').text(1);
		$('.fill1, .fill2, .fill4, .fill5').css('opacity', 0.5);
		$('.fill3').css('opacity', 1);

	});

    $('#button3').click(function(){
		viz.gotoFrame(4,700);
		// var f = viz.nextFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(1);
		$('#activeFrame').text(1);
		$('#button1Line, #button4Line').hide();
		$('#button3Line').show();

	});

    $('#button4').click(function(){
		viz.gotoFrame(5,700);
		// var f = viz.nextFrame(1000);
		$('#lContent').scrollTop(0);
		updateSelect(1);
		$('#activeFrame').text(1);
		$('#button1Line, #button3Line').hide();
		$('#button4Line').show();

	});

	viz.maxFrames(5);
	viz.gotoFrame(1);

	$(document).ready(function(){
		$("#loader").hide();
	});

});




	function addCommas(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	function getToplineDate(str){
		console.log(str);
		var d = str.substring(0, 2);
		var m = str.substring(4, 5);
		var y = str.substring(6, 10);

		m = monthNames[m-1];
		var df = d + ' ' +m + ' '+y;

		return df;
	}