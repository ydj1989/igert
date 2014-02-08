var Igert = {};

Igert.mainFunction = function() {
	// private members
		delete_button =
		  '<div class="delete" style="display:none; color:red; position:absolute; left: 60px; top: 0px;">Delete</div>',
		begin_html =
			'<div class="pg_content" page="0">' +
				'<h1>Start Calculating</h1>' +
				'<div class="option name">' +
					'<div class="option_name">Name</div>' +
					'<input id="name" type="text" value="PVWatts Calculator"/>' +
				'</div>' +
				'<div class="map_preview">' +
					'Click below to customize your system on a map (optional)' +
					'<div class="map_img"></div>' +
				'</div>' +
			'</div>',
		input_html =
			'<br>' +
			'<div class="sections pg_content" page="1">' +
				'<div class="basic_section section_type">' +
					'<div class="section basic selectedS" type="basic" identifier="default">' +
					  '<div class="section_name cursor">Basic System Info</div>' +
						  '<div class="option address">' +
							'<div class="option_name">Address</div>'+
							'<input id="address" type="text" value="10905 Ohio Ave, LA, CA"/>' +
						  '</div>' +
						  '<div class="option system_size">' +
							'<div class="option_name">DC System Size(kW)</div>' +
							'<input id="system_size" type="text" value="4"/>' +
						  '</div>' +
						  '<div class="option track_mode">' +
							'<div class="option_name">Array Type</div>' +
							'<input id="track_mode" type="text" readonly="readonly" value="0"/>' +
						  '</div>' +
						  '<div class="option derate">' +
							'<div class="option_name">DC-to-AC Derate Factor</div>' +
							'<input id="derate" type="text" value="0.77"/>' +
						  '</div>' +
						  '<div class="option tilt">' +
							'<div class="option_name">Tilt(deg)</div>' +
							'<input id="tilt" type="text" value="0.0"/>' +
						  '</div>' +
						  '<div class="option azimuth">' +
							'<div class="option_name">Azimuth(deg)</div>' +
							'<input id="azimuth" type="text" value="180"/>' +
						  '</div>' +
					'</div>' +
					'<div class="section advanced" type="advanced" identifier="default">' +
					  '<div class="section_name cursor">Advanced Info</div>' +
					  '<div class="option inoct">' +
						'<div class="option_name">Nominal Operating Cell Temperature(C)</div>' +
						'<input id="inoct" type="text" value=""/>' +
					  '</div>' +
					  '<div class="option gamma">' +
						'<div class="option_name">Max Power Temperature Coefficient(%/C)</div>' +
						'<input id="gamma" type="text" value=""/>' +
					  '</div>' +
					'</div>' +
					'<div class="section econ" type="econ" identifier="default">' +
					  '<div class="section_name cursor">Initial Economics (Optional)</div>' +
					  '<div class="option econ_1">' +
						'<div class="option_name">Sytem Type</div>' +
						'<input id="econ_1" type="text" readonly="readonly" value="Residential"/>' +
					  '</div>' +
					  '<div class="option econ_2">' +
						'<div class="option_name">Average Cost of Electricity Purchased from Utility ($/kWh)</div>' +
						'<input id="econ_2" type="text" value="0.00"/>' +
					  '</div>' +
					  '<div class="option econ_3">' +
						'<div class="option_name">Initial Cost ($/Wdc)</div>' +
						'<input id="econ_3" type="text" value="3.70"/>' +
					  '</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<br>' +
			'<div id="submit"> Save </div>' +
			'<div id="check"> Check </div>',
		result_html =
			'<div class="pg_content" page="2">' +
				'<h1>Result Page</h1>' +
				'<table id=result>' +
					'<tbody>' +
						'<tr> <th>Month</th> <th>Solar Radiation</th> <th>AC Energy</th> <th>Energy Value</th> </tr>'+
						'<tr> <th>January</th> <th><%= solrad[0] %></th> <th><%= ac[0] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>February</th> <th><%= solrad[1] %></th> <th><%= ac[1] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>March</th> <th><%= solrad[2] %></th> <th><%= ac[2] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>April</th> <th><%= solrad[3] %></th> <th><%= ac[3] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>May</th> <th><%= solrad[4] %></th> <th><%= ac[4] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>June</th> <th><%= solrad[5] %></th> <th><%= ac[5] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>July</th> <th><%= solrad[6] %></th> <th><%= ac[6] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>August</th> <th><%= solrad[7] %></th> <th><%= ac[7] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>September</th> <th><%= solrad[8] %></th> <th><%= ac[8] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>October</th> <th><%= solrad[9] %></th> <th><%= ac[9] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>November</th> <th><%= solrad[10] %></th> <th><%= ac[10] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>December</th> <th><%= solrad[11] %></th> <th><%= ac[11] %></th> <th> N/A </th> </tr>'+
						'<tr> <th>Annual</th> <th><%= solrad_ann %></th> <th><%= ac_ann %></th> <th> N/A </th> </tr>'+
					'</tbody>' +
				'</table>' +
				'<br>' +
				'<div id="save">Save</div>' +
			'</div>',

			googleMapHTML =
				'<div class="wrapperGoogle" id="google_map">' +
					'<div class="resizable_map">' +
						'<div class="gmap" >' +					
							'<div class="pgNav draggable">' +
								'<div class="tabNav">' + 'GOOGLE MAP' +	
								'</div>' +
								'<div class="hide_map cursor"> - </div>' +
								'<div class="exit cursor"> X </div>' +
							'</div>' +
							'<div id="googleMap">' +
							'</div>'
						'</div>' +
					'</div>' +
				'</div>' ,
			
		result_template = _.template(result_html),
		
		/*
		
			input_to_build takes multiple(not limited) fields and options within each field as an input object and draws
			the html page(2). field1, field2, option1, option2 should be replaced with desirable names that will be shown to user
			on the page, and values for id and val are used as DOM element class name and default value for the option 
			respectively. DOM element class names are passed to AJAX request to retrieve the result.
		*/
		input_to_build = {
			field1: { option1: {id: "id1", val: "1"}, option2: {id: "id2", val: "2"}, option3: {id: "id3", val: "3"} },
			field2: { option1: {id: "id1", val: "1"}, option2: {id: "id2", val: "2"}, option3: {id: "id3", val: "3"} },
			field3: { option1: {id: "id1", val: "1"}, option2: {id: "id2", val: "2"}, option3: {id: "id3", val: "3"} },
			field4: { option1: {id: "id1", val: "1"}, option2: {id: "id2", val: "2"}, option3: {id: "id3", val: "3"} }
		},

		build_html =
			'<div class="sections pg_content" page="1">' +
				'<div class="basic_section section_type">' +			
					'<% for (var field in input) { %>' +
						'<div class="section <%= field %>" type="<%= field %>" identifier="default">' +
							'<div class="section_name"><%= field %></div>' +
							'<% for (var option in input[field]) { %>' +
								'<div class="option <%= ((input[field])[option])["id"] %>">' +
									'<div class="option_name"><%= option %></div>' +
									'<input id="<%= ((input[field])[option])["id"] %>" type="text" value="<%= ((input[field])[option])["val"] %>"/>' +
								'</div>' +
							'<% } %>' +
						'</div>' +
					'<% } %>'+

				'</div>' +
			'</div>' +
			'<br>' +
			'<div id="submit"> Save </div>' +
			'<div id="check"> Check </div>',
		build_template = _.template(build_html),
		page_array = [],
		page_array[0] = begin_html,
		page_array[1] = input_html,
		page_array[2] = result_template({ solrad: {}, solrad_ann: '', ac: {}, ac_ann: '' }),
		page_number = 0,
		solar_calculator = 
			'<div class="wrapperCalc" id="solar_calc">' +
				'<div id="prev" class="cursor"></div>' +
				'<div class="resizable_pvc">' +
					'<div class="pvcalc">' +
						'<div id="floatingBarsG">' +
							'<div class="blockG" id="rotateG_01"></div>' +
							'<div class="blockG" id="rotateG_02"></div>' +
							'<div class="blockG" id="rotateG_03"></div>' +
							'<div class="blockG" id="rotateG_04"></div>' +
							'<div class="blockG" id="rotateG_05"></div>' +
							'<div class="blockG" id="rotateG_06"></div>' +
							'<div class="blockG" id="rotateG_07"></div>' +
							'<div class="blockG" id="rotateG_08"></div>' +
						'</div>' +	
						'<div class="pgNav draggable">' +
							'<div class="tabNav">' +
								'<div class="all_tabs">' +
								'</div>' +														'</div>' +
							'<div class="pageNav cursor" id="pg0" page="0"> [Name] </div>' +
							'<div class="pageNav cursor" id="pg1" page="1"> [Input] </div>' +
							'<div class="pageNav cursor" id="pg2" page="2"> [Result] </div>' +
							'<div class="add_tab cursor window">+Add</div>' +
							'<div class="hide cursor"> - </div>' +
							'<div class="exit cursor"> X </div>' +
						'</div>' +
						'<div class="contents">' +
							'<div class="add_tab startpg cursor">+Create An Instance</div>' +
						'</div>' +
					'</div>' +
				'</div>' +				
				'<div id="next" class="cursor"></div>' +
			'</div>' ,
		heatMapData = {},
		elevator = {},
		m_lat = 0,
		m_lng = 0;

	return {
		init: function(cfg) {
			var cfg = cfg || {};
			
			// initialize private members using cfg
			// ...
			//this.setVariables();
			
			this.drawPage(false); //if it's set to true, drawing a page based on the input object is executed
			this.setPageNumber();
			this.initEventHandlers();
		},
		
		//draws a page based on the input object
		drawPage: function( bool ) {
			if( bool && input_to_build ) {
				page_array[1] = build_template({ input: input_to_build });
			}
		},
		
		setPageNumber: function() {
			//set it -1 for the beginning
			page_number = $(".contents").find(".pg_content").attr("page") || -1;
			$("#page").html(page_number);			
			$(".pvcalc").find(".current_page").removeClass("current_page");
			$(".pageNav").each(function(e) {
				if( $(this).attr("page") == page_number) {
					$(this).addClass("current_page");
				}
			});
		},
		
		setResultPage: function() {
			var _this = this,
				instanceID = "igert_" + $(".current_tab").attr("id"),
				request = "http://developer.nrel.gov/api/pvwatts/v4.json?api_key=6effe95b2abb3a80c5983f48ac4dad98998f1a22",
				res_solrad,
				res_solrad_ann,
				res_ac,
				res_ac_ann;
			
			//if users do not move from the input page,
			//get the results by using data stored in cookie
			if( $(".section").find(".option").length === 0 ) {
				var cookieString = $.cookie(instanceID);
				if( cookieString ) {
					request += cookieString;
					console.log(request)
				}
			}
			
			$(".section").find(".option").each(function(e) {
				var inputField = $(this).find('input'),
					id = inputField.attr('id'),
					val = inputField.val();
				if(val)
					request = request + "&" + id + "=" + val;
			});
			
			$.ajax({
				url: request, 
				type: "GET",
			}).done(function(data){
				console.log(data)
				res_solrad = data.outputs.solrad_monthly;
				res_solrad_ann = data.outputs.solrad_annual;
				res_ac = data.outputs.ac_monthly;
				res_ac_ann = data.outputs.ac_annual;
				page_array[2] = result_template({ solrad: res_solrad, solrad_ann: res_solrad_ann, ac: res_ac, ac_ann: res_ac_ann });
				$(".contents").html(page_array[2]);				
				_this.setPageNumber();
			}).fail(function(j) {
				page_array[2] = '<div class="pg_content" page="2">' + j.responseText + '</div>';
				$(".contents").html(page_array[2]);
				_this.setPageNumber();
			});
			
			
			
		},
		
		getPageNumber: function() {
			return page_number;
		},
		
		initEventHandlers: function() {
			var _this = this;
			//_this.configureSelect();
			_this.configureCookie();
			//_this.createDeleteButton();
			//_this.configureDeleteButton();
			//_this.configureAutoSave();
			//_this.configurePageMove();
			//_this.configurePageNav();
			//_this.configureCalc();
			_this.configureController();
			//_this.configureAddTab();
			//_this.configureTabNav();
			_this.configurePointer();
			_this.configureLogin();
			_this.configureSignup();
		},
		
		configureSelect: function() { 
			var _this = this,
				section_height = 0;
			
			// remove all existing first
			$(".section").off("click");
			$(".option").off("click");
			$(".choice").off("click");
			
			
			$(".section_name").on("click", function(e) {
					var parent = $(this).parent();
					section_height = (parent.children().length)*50;
					if( parent.hasClass("selectedS") ) {
						parent.css("height", "25px");
						parent.removeClass("selectedS");
					} else {
						parent.addClass( "selectedS" );
						parent.animate({
						  height: section_height
						}, 600 );
					}
			});
			

			
			/*
			$(".option").on("click", function(e) {
				if( $(e.target).hasClass("option") ) {
					if( $(this).hasClass("selectedO") ) {
						$(this).removeClass("selectedO");
					} else {
						$(this).parent().find(".selectedO").removeClass("selectedO");
						$(this).addClass( "selectedO" );
					}
				}
			});

			$(".choice").on("click", function(e) {
				if( $(e.target).hasClass("choice") ) {
					if( $(this).hasClass("chosen") ) {
						$(this).removeClass("chosen");
					} else {
						$(this).parent().find(".chosen").removeClass("chosen");
						$(this).addClass( "chosen" );
					}
				}
			});
			*/
			
		},

		////////////////// Replace!////////////////
		configureController: function() {
			var _this = this;
					
			$(".ctrl_pvc").on("click", function(e) {
				var solar_window = '<div class="window_tab solar_calc_window"><div class="solar_img"/></div>';																											
				if( $(".wrapperCalc").length == 0 ) {
					$(".total").append(solar_calculator);
					$(".bottombar").append(solar_window);
					_this.configureSelect();
					_this.configureAutoSave();
					_this.configurePageMove();
					_this.configurePageNav();
					_this.configureCalc();
					_this.configureAddTab();
					_this.configureTabNav();																								
					_this.configurePointer();
					_this.configureWindow();
					_this.configureLoadSpinner();
					
				}
			});
					
			$(".ctrl_googmap").on("click", function(e) {
				var gmap_window = '<div class="window_tab google_map_window"><div class="gmap_img"/></div>';																											
				if( $(".wrapperGoogle").length == 0 ) {
					$(".total").append(googleMapHTML);
					$(".bottombar").append(gmap_window);
					_this.configureSelect();
					//_this.configureAutoSave();
					_this.configurePageMove();
					_this.configurePageNav();
					_this.GoogleMapWidget();
					//_this.configureAddTab();
					//_this.configureTabNav();																						
					_this.configurePointer();
					_this.configureWindowGMAP();
					_this.configureLoadSpinner();
					_this.heatmapLoad();
					
				}
			});		
			
		},
		
		configureWindow: function() {
			$(".window_tab").off();
			$(".window_tab").on("click", function() {
				$("#solar_calc").show();
			}).on("mouseenter", function() {
				$(this).addClass( "mouseover" );
				//$(this).css("box-shadow", "0 0 5px 2px rgba(224, 224, 31, 0.8)");
			}).on("mouseleave", function() {
				$(this).removeClass( "mouseover" );
				//$(this).css("box-shadow", "");
			});
		},
		
		configureCalc: function() {
			$( ".wrapperCalc" ).draggable({ handle: ".draggable", containment: "parent" });
			$(".exit").on("click", function() {
				var calc = $(this).closest(".wrapperCalc"),
					id = calc.attr("id");
				calc.remove();
				$("." + id + "_window").remove();
				
			});
			$(".hide").on("click", function() {
				$(".wrapperCalc").hide();
			});
			$( ".resizable" ).resizable({ handles: "se", alsoResize: ".wrapperCalc", minWidth: 250, minHeight: 250 });
		},
		
		saveNameFunction: function() {
			var name = $(".name").find("#name").val();
			$(".pvcalc").attr("name", name);
			$(".all_tabs").find(".current_tab").text(name);
		},
		
		saveCookieFunction: function() {
			var cookieString = "",
				cookieID = "igert_" + $(".current_tab").attr("id");
			console.log('saving cookie...' + cookieID)
			$(".pvcalc").find(".section_type").find(".option").each(function(e){
				var inputField = $(this).find('input'),
					id = inputField.attr('id'),
					val = inputField.val();
				if(val)
					cookieString += "&" + id + "=" + val;
			});
			$.cookie( cookieID, cookieString );
		},
		
		loadCookieFunction: function() {
			var instanceID = "igert_" + $(".current_tab").attr("id"),
				cookieString = $.cookie(instanceID),
				currentId = "",
				currentVal = "",
				valOrId = true; //it's true if it's reading id and false if it's reading value
				
			if( !cookieString ) {
				return;
			}
			
			for ( var i = 0; i < cookieString.length; i++ ) {
				if( cookieString[i] === '&' ) {
					if ( currentId !== "" && currentVal !== "" ) {
						$("#" + currentId).val(currentVal);
					}
					currentId = "";
					valOrId = true;
					continue;
				} else if( cookieString[i] === '=') {
					currentVal = "";
					valOrId = false;
					continue;
				}
				if( valOrId )
					currentId += cookieString[i];
				else
					currentVal += cookieString[i];
			}
			
			// last one
			$("#" + currentId).val(currentVal);
			
		},
		
		configureCookie: function() {
			var _this = this;
			$("#submit").off("click");
			$("#submit").on( "click", function(e) {
				_this.saveCookieFunction();
			});

			$("#check").on( "click", function(e) {
				var message = "";
				message = $.cookie('current');
				alert( message )
			});
		},

		configureAddTab: function() {
			var _this = this,
				newName = "No Name",
				id, elem;
			
			$(".add_tab").off("click");
			$(".add_tab").on("click", function(e) {
				id = $(".all_tabs").find(".tab").length,
				elem = '<div class="wrapperTab"><div class="tab current_tab cursor" id=' + id + '>' + newName + '</div></div>';
				$(".tabNav").find(".current_tab").removeClass("current_tab");
				$(".all_tabs").append(elem);
				$(".contents").html(page_array[0]);
				_this.setPageNumber();
				_this.configureTabNav();
				_this.configureRemoveTab();
				_this.configurePointer(); //comes at the end
				_this.configureMap();
			});
		},
		
		configureRemoveTab: function() {
			var _this = this,
				elem = '<div class="removeTab cursor">x</div>',
				startPg= '<div class="add_tab startpg cursor">+Create An Instance</div>';
				
			$(".wrapperTab").each(function(e){
				if( $(this).find(".removeTab").length === 0 )
					$(this).append(elem);				
			});
			
			$(".removeTab").on("click", function(){
				$(this).parent().remove();
				if( $(".wrapperTab").length === 0 )
					$(".contents").empty();
			});

		},
		
		//automatically saves cookie when the section is closed/opened, when the input filed
		//is filled, when the user goes to another page
		configureAutoSave: function() {
			var _this = this;
			
			$(".section_type").find(".option").find("input").on("blur", function(e) {
				_this.saveCookieFunction();
			});
		},
		
		createDeleteButton: function(){
			$(".section").each(function() {
				if( $(this).find(".delete").length === 0 )
					$(this).append(delete_button);
			});
		},
		
		configureDeleteButton: function() {
			var _this = this;
			$(".section").hover(
				function() {
					$(this).find(".delete").show();
				}, function() {
					$(this).find(".delete").hide();
				}
			);
			
			$(".delete").on("click", function(e) {
				$(this).parent().remove();
				_this.saveCookieFunction();
			});
		},
		
		configurePageMove: function() {
			var _this = this;
			
			$("#prev").off("click");
			$("#prev").on("click", function(e) {
				var current_page = Number(_this.getPageNumber()),
					target_page = current_page - 1,
					current_tab_exist = $(".all_tabs").find(".current_tab").length;
				if( current_tab_exist === 0 )
					return;
				if( current_page === 1) {
					_this.saveCookieFunction();
				}
				if( target_page >= 0 && target_page <= 2) {
					$(".contents").html(page_array[target_page]);
					_this.setPageNumber();
					if( target_page === 0) {
						$('input').val( $('.current_tab').text() );
						_this.configureMap();
					} else if( target_page === 1) {
						_this.configureSelect();
						_this.configureCookie();
						_this.configureAutoSave();
						_this.loadCookieFunction();
						//_this.initEventHandlers();
					}
				}
			});
			
			$("#next").off("click");
			$("#next").on("click", function(e) {
				var current_page = Number(_this.getPageNumber()),
					target_page = current_page + 1,
					current_tab_exist = $(".all_tabs").find(".current_tab").length;
				if( current_tab_exist === 0 )
					return;
				if( current_page === 0 ) {
					_this.saveNameFunction();
				} else if( current_page === 1) {
					_this.saveCookieFunction();
				}
				if( target_page >= 0 && target_page <= 2) {
					if( target_page === 2) {
						_this.setResultPage();
					} else {
						$(".contents").html(page_array[target_page]);
						_this.setPageNumber();
					}
					
					if( target_page === 1) {
						_this.configureSelect();
						_this.configureCookie();
						_this.configureAutoSave();
						_this.loadCookieFunction();
						_this.configurePointer();
						//_this.initEventHandlers();
					}
				}
			});
		},
		
		configurePageNav: function() {
			var _this = this;
			$("#pageNav").off("click");
			$(".pageNav").on("click", function(e) {
				var target_page = Number($(this).attr("page")),
					current_page = Number(_this.getPageNumber()),
					current_tab_exist = $(".all_tabs").find(".current_tab").length;
				if( current_tab_exist === 0 )
					return;
				if( current_page === 0) {
					_this.saveNameFunction();
				} else if( current_page === 1) {
					_this.saveCookieFunction();
				}
				if( target_page >= 0 && target_page <= 2) {
					if( target_page === 2) {
						_this.setResultPage();
					} else {
						$(".contents").html(page_array[target_page]);
						//$(".contents").load("test.htm");
						if( target_page === 0 ) {
							$('input').val( $('.current_tab').text() );
						}
						_this.setPageNumber();
					}
					if( target_page === 1) {
						_this.configureSelect();
						_this.configureCookie();
						_this.configureAutoSave();
						_this.loadCookieFunction();
						_this.configurePointer();
						//_this.initEventHandlers();
					} else if (target_page === 0) {
						_this.configureMap();
					}
				}
			});
		},
		
		configureSave:function() {
		
		},
		
		configureTabNav: function() {
			var _this = this,
				currentPage;
				
			$(".tab").off("click");
			$(".tab").on("click", function(e) {
				currentPage = _this.getPageNumber();
				$(".tabNav").find(".current_tab").removeClass("current_tab");
				$(this).addClass("current_tab");
				
				if( currentPage == 0 ) { console.log('--0')
					$('input').val( $('.current_tab').text() );
				} else if ( currentPage == 1) { console.log('--1')
					_this.loadCookieFunction();
				} else if ( currentPage == 2) { console.log('--2')
					_this.setResultPage();
				}
				
			});
		},
		
		configureLoadSpinner: function() {
			$('#floatingBarsG')
				.hide()  // hide it initially
				.ajaxStart(function() {
					$(this).show();
				})
				.ajaxStop(function() {
					$(this).hide();
				});
		},
		
		configurePointer: function() {
			$(".cursor").off("mouseover");
			$(".cursor").on("mouseover", function() {
				$(this).addClass("pointer");
			}). on("mouseout", function() {
				$(this).removeClass("pointer");
			});
		},

		configureMap: function() {
			$(".map_img").on("click", function() {
				//alert("MAP");
				$.blockUI({
					message: "<div style='position:relative;'><iframe src='/map' width='600' height='400' frameborder='0'></iframe></div>", 
					blockMsgClass: 'blockMsg',
					css: {
						backgroundColor:'#fff',
						'border':'1px solid #ccc',
						'padding':'0',
						'-webkit-box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'-moz-box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'-webkit-border-radius':'9px',
						'-moz-border-radius':'9px',
						'border-radius':'9px',
						'width': '600',
						'height': '400'						
					},
					overlayCSS: {
						backgroundColor:"#fff",
						opacity:0.8,
						'cursor':'default'
					},
					fadeIn:150
				});
				
				$('.blockUI').center();
				$('.blockUI.blockMsg').removeClass("blockMsg");
				$('.blockOverlay').click($.unblockUI);
				
			}).on("mouseenter", function() {
				$(this).addClass( "pointer" );
			}).on("mouseleave", function() {
				$(this).removeClass( "pointer" );
			});	
		},
		
		unblockMap: function() {
			$.unblockUI();
		},
		
		storeLocation: function(lat, lng) {
			m_lat = lat;
			m_lng = lng;
		},
		
		showLocation: function() {
			console.log(m_lat + "," + m_lng);
		},
		
		configureLogin: function() {
			$(".ctrl_login").on("click", function() {
				//alert("MAP");
				$.blockUI({
					message: "<div style='position:relative;'><iframe src='/login' width='300' height='250' frameborder='0'></iframe></div>", 
					blockMsgClass: 'blockMsg',
					css: {
						backgroundColor:'#fff',
						'border':'1px solid #ccc',
						'padding':'0',
						'-webkit-box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'-moz-box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'-webkit-border-radius':'9px',
						'-moz-border-radius':'9px',
						'border-radius':'9px',
						'width': '300',
						'height': '250'						
					},
					overlayCSS: {
						backgroundColor:"#fff",
						opacity:0.8,
						'cursor':'default'
					},
					fadeIn:150
				});
				
				$('.blockUI').center();
				$('.blockUI.blockMsg').removeClass("blockMsg");
				$('.blockOverlay').click($.unblockUI);
				
			}).on("mouseenter", function() {
				$(this).addClass( "pointer" );
			}).on("mouseleave", function() {
				$(this).removeClass( "pointer" );
			});					
			
		},
		configureSignup: function() {
			$(".ctrl_signup").on("click", function() {
				//alert("MAP");
				$.blockUI({
					message: "<div style='position:relative;'><iframe src='/signup' width='300' height='400' frameborder='0'></iframe></div>", 
					blockMsgClass: 'blockMsg',
					css: {
						backgroundColor:'#fff',
						'border':'1px solid #ccc',
						'padding':'0',
						'-webkit-box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'-moz-box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'box-shadow':'0 0 5px 2px rgba(0,0,0,.1)',
						'-webkit-border-radius':'9px',
						'-moz-border-radius':'9px',
						'border-radius':'9px',
						'width': '300',
						'height': '400'						
					},
					overlayCSS: {
						backgroundColor:"#fff",
						opacity:0.8,
						'cursor':'default'
					},
					fadeIn:150
				});
				
				$('.blockUI').center();
				$('.blockUI.blockMsg').removeClass("blockMsg");
				$('.blockOverlay').click($.unblockUI);
				
			}).on("mouseenter", function() {
				$(this).addClass( "pointer" );
			}).on("mouseleave", function() {
				$(this).removeClass( "pointer" );
			});					
			
		},

		heatmapLoad: function() {

			heatMapData = new google.maps.MVCArray();
			elevator = new google.maps.ElevationService();			
			
			var _this = this,
				mapOptions = {
				zoom: 10,
				center: new google.maps.LatLng(34.0522300, -118.2436800),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			map, pointarray, heatmap;
			
			var nw_lat = 34.16566,
				nw_lng = -118.58795,
				se_lat = 33.93866,
				se_lng = -118.08533,
				weightedElev;
				
			map = new google.maps.Map( document.getElementById('googleMap'),
					mapOptions);
			
			for (var x = se_lat; x < nw_lat; x+=0.012) {
				for (var y = nw_lng; y < se_lng; y+= 0.012) {
					
					var currentLatLng = [];
					
					// convert the increasing latitude & longitude into google map coordinates
					currentLatLng.push( new google.maps.LatLng(x,y));
					
					var positionCoord = {
						'locations': currentLatLng
					}
					
					if ( x < 34.04 ) {
						if( y > -118.4314)
							// plot heatmap only the bottom right area of LA
							_this.getElevation(positionCoord, x, y)
					} else {	// plot the top-half part of LA
						_this.getElevation(positionCoord, x, y)
					}
					
				}
			}
			
			heatmap = new google.maps.visualization.HeatmapLayer({
				data: heatMapData
			});
			
			heatmap.setMap(map);
			heatmap.set('radius', heatmap.get('radius') ? null : 20);
			
		},

		// Getting the elevation from latitude and longitude plot
		getElevation: function(data, lat, lng) {
			// get the weight of elevation at each x,y coordinate
			elevator.getElevationForLocations(data, function(results, status)
			{
				if (status == google.maps.ElevationStatus.OK) {
					// Retrieve the elevation and append to heatMapData array
					if (results[0]) {
					
						var elev = results[0].elevation;
						
						heatMapData.push({
							location: new google.maps.LatLng(lat, lng),
							weight: elev
						});
				
					} else {
					alert("Elevation is not found!");
					}
				} else {
					alert("Elevation service failed due to: " + status);
				}
			});
		},

		///////////////////// NEWLY ADDED!!! ///////////////////////////
		configureWindowGMAP: function() {
			$(".google_map_window").off();
			$(".google_map_window").on("click", function() {
				$("#google_map").show();
			}).on("mouseenter", function() {
				$(this).addClass( "mouseover" );
				//$(this).css("box-shadow", "0 0 5px 2px rgba(224, 224, 31, 0.8)");
			}).on("mouseleave", function() {
				$(this).css("box-shadow", "");
			});
		},

		configureCalc: function() {
			$( ".wrapperCalc" ).draggable({ handle: ".draggable", containment: "parent" });
			$(".exit").on("click", function() {
				var calc = $(this).closest(".wrapperCalc"),
					id = calc.attr("id");
				calc.remove();
				$("." + id + "_window").remove();
				
			});
			$(".hide").on("click", function() {
				$(".wrapperCalc").hide();
			});
			$( ".resizable_pvc" ).resizable({ handles: "se", alsoResize: ".wrapperCalc", minWidth: 250, minHeight: 250 });
		},

		// NEWLY ADDED FUNCTION!!!
		GoogleMapWidget: function() {
			$( ".wrapperGoogle" ).draggable({ handle: ".draggable", containment: "parent" });
			$(".exit").on("click", function() {
				var calc = $(this).closest(".wrapperGoogle"),
					id = calc.attr("id");
				calc.remove();
				$("." + id + "_window").remove();
				
			});
			$(".hide_map").on("click", function() {
				$(".wrapperGoogle").hide();
			});
			$( ".resizable_map" ).resizable({ handles: "se", alsoResize: ".wrapperGoogle", minWidth: 250, minHeight: 250 });
		}

		
	}
}();

$( document ).ready(function() {
    Igert.mainFunction.init();
});


