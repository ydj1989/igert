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
							'<div id="contourMap">' +
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
		InitZoom = 10,
		gMap = null,
		infowindow = null,
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
			
			console.log("Reqeustt: ", request)
			
			$.ajax({
				url: request, 
				type: "GET",
			}).done(function(data){
				console.log("AJAX request: ", data)
				res_solrad = data.outputs.solrad_monthly;
				res_solrad_ann = data.outputs.solrad_annual;
				res_ac = data.outputs.ac_monthly;
				res_ac_ann = data.outputs.ac_annual;
				page_array[2] = result_template({ solrad: res_solrad, solrad_ann: res_solrad_ann, ac: res_ac, ac_ann: res_ac_ann });
				$(".contents").html(page_array[2]);				
				_this.setPageNumber();
				
				console.log("solar average!~: ", res_solrad_ann)
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
					_this.contourMapWidget();
					//_this.configureAddTab();
					//_this.configureTabNav();																						
					_this.configurePointer();
					_this.configureWindowGMAP();
					_this.configureLoadSpinner();
					_this.loadContourMap();
					
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
		
		initializeMap: function (ID) 
		{
			gMap = new google.maps.Map(document.getElementById(ID), {
				center: new google.maps.LatLng(34.0522300, -118.2436800),
				zoom: InitZoom,
				mapTypeId: 'roadmap'
				
			});	
		},
		
		CreatePolygon: function (polydata, gps, bgColor, strokeColor, html)
		{
			var _this = this;
			var points =  eval( polydata);	
			var arr = [];
			var coord;
			var latlng;
			
			var bounds = new google.maps.LatLngBounds();
			
			for (var x = 0; x < points.length; x++)
			{
				coord = points[x].split(',');		
				latlng = new google.maps.LatLng (coord[1],coord[0]);		
				bounds.extend (latlng);
				arr.push ( latlng );
			}
			
			var poly = new google.maps.Polygon ({     
				paths: arr,
				strokeColor: strokeColor,
				strokeOpacity: 0.8,
				strokeWeight: 1,
				fillColor: bgColor,
				fillOpacity: 0.3   
			});
			
			google.maps.event.addListener(poly, "click", function(event) {		
				if (infowindow) 
					infowindow.close();       		
				
				if (html != "")
				{
					infowindow = new google.maps.InfoWindow ({
						content: "<div style='width:150px;'>" + html + "</div>"
					});
					
					infowindow.setPosition(event.latLng);    
					infowindow.open(gMap);
				}
			});     
			
			google.maps.event.addListener(poly, "mouseover", function() {		
				this.setOptions({fillOpacity:0.2});			
			}); 
			
			google.maps.event.addListener(poly, 'mouseout', function(){
				this.setOptions({fillOpacity:0.3});
			});
			
			poly.setMap(gMap);
			
			return poly;
		},
		
		DrawShapes: function(map_id, location, shapes)
		{
			var _this = this;
			var bounds = new google.maps.LatLngBounds();
			
			// initiate GoogleMap! only if gMap is NULL
			if (gMap == null)
				_this.initializeMap(map_id);
			
			if (shapes != null)
			{							
				for (var key in shapes) {
					if (shapes.hasOwnProperty(key)) {
						var info = "<span>Zip Code " + shapes[key].Zip + "<\/span><span><br>Avg Solar Radiation: ";
						var solar = _this.getSolarInfo( shapes[key].Zip );
						var avg_Solar, avg_AC;
						var fill, border;
						
						solar.success(function (data) {
							avg_Solar = data.outputs.solrad_annual;
							avg_AC = data.outputs.ac_annual;
							
							info = info + avg_Solar + "<\/span><span><br>Avg AC Energy: " + avg_AC + "<\/span>";
							
							if ( avg_Solar > 5) {
								fill = "#c60c0c";
								border = "#9f1f1f";
							} else {
								fill = "#1f4a9f";
								border = "#1f5f9f";
							}
						}).error(function(jqXHR, textStatus, errorThrown) {
							console.log("Failed due to: " + textStatus)
						});
						
						var poly = _this.CreatePolygon (shapes[key].Shape, shapes[key].LatLon, fill, border, info);
						var coord = shapes[key].LatLon.split(',');
						
					}
					bounds.extend (new google.maps.LatLng (coord[0],coord[1]));
				}
				/*if (shapes.length > 1) {	//make sure that there are more then one point
					gMap.setCenter(bounds.getCenter());
					gMap.fitBounds(bounds);
				}*/
				
				return true;
			}
			return false;
		},
		
		// Gets solar information based on the location
		getSolarInfo: function( addr )
		{
			var _this = this,
				request = "http://developer.nrel.gov/api/pvwatts/v4.json?api_key=6effe95b2abb3a80c5983f48ac4dad98998f1a22",
				res_solrad_ann,
				res_ac_ann;
			
			// append the address info to request
			request = request + "&address=" + addr + "&system_size=4&track_mode=0&derate=0.77&tilt=0.0&azimuth=180&econ_1=Residential&econ_2=0.00&econ_3=3.70";
			
			return $.ajax({
				url: request,
				type: "GET",
				async: false
			});
		},
		
		/*
		codeAddress: function(location) {
			var _this = this;
			
			geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': location}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {			
					//gMap.setCenter(results[0].geometry.location);			
				} 
			});
		},*/
		
		// CONTOURMAP function!
		loadContourMap: function() {
			var _this = this;
			
			_this.DrawShapes( 'contourMap', 'santa monica,CA', [{"Zip":"90401","Lat":"34.0172","Lon":"-118.494","LatLon":"34.0172,-118.494","Shape":["-118.502813,34.015509","-118.489613,34.026109","-118.489613,34.026109","-118.489013,34.024009","-118.484413,34.020009","-118.487242,34.016187","-118.489556,34.011793","-118.487113,34.00981","-118.487113,34.00981","-118.492692373004,34.0058247335683","-118.492692373004,34.0058247335683","-118.502813,34.015509"] },
																{"Zip":"90402","Lat":"34.0375","Lon":"-118.497","LatLon":"34.0375,-118.497","Shape":["-118.483713,34.041509","-118.501744,34.026891","-118.503713,34.026909","-118.508313,34.023209","-118.509320965798,34.0201851026035","-118.509320965798,34.0201851026035","-118.519514,34.027509","-118.519514,34.027509","-118.518114,34.032509","-118.518314,34.033809","-118.516119,34.03954","-118.512096,34.044884","-118.509961,34.051088","-118.50922,34.050253","-118.508614,34.040909","-118.509614,34.037709","-118.508791,34.034177","-118.502314,34.042109","-118.494627,34.050296","-118.494014,34.050308","-118.494014,34.050308","-118.489513,34.046509","-118.487413,34.047209","-118.485479666667,34.043609","-118.483713,34.041509"], "Popup": "<span>Zip Code 90402<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
																{"Zip":"90403","Lat":"34.0329","Lon":"-118.488","LatLon":"34.0329,-118.488","Shape":["-118.483713,34.041509","-118.480013,34.044509","-118.481066,34.045598","-118.48067,34.046311","-118.477813,34.046509","-118.473013,34.044209","-118.470213,34.041909","-118.470213,34.041909","-118.470813,34.041409","-118.470813,34.041409","-118.489613,34.026109","-118.489613,34.026109","-118.502813,34.015509","-118.502813,34.015509","-118.509320965798,34.0201851026035","-118.509320965798,34.0201851026035","-118.508313,34.023209","-118.503713,34.026909","-118.501744,34.026891","-118.483713,34.041509"], "Popup": "<span>Zip Code 90403<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
																{"Zip":"90404","Lat":"34.0276","Lon":"-118.472","LatLon":"34.0276,-118.472","Shape":["-118.470813,34.041409","-118.461412,34.033309","-118.461412,34.033309","-118.456912,34.02981","-118.452912,34.02811","-118.453501,34.02785","-118.453501,34.02785","-118.455612,34.02771","-118.461912,34.02561","-118.466212,34.02221","-118.466212,34.02121","-118.482813,34.01241","-118.484013,34.01181","-118.487113,34.00981","-118.487113,34.00981","-118.489556,34.011793","-118.487242,34.016187","-118.484413,34.020009","-118.489013,34.024009","-118.489613,34.026109","-118.489613,34.026109","-118.470813,34.041409"], "Popup": "<span>Zip Code 90404<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
																{"Zip":"90405","Lat":"34.014","Lon":"-118.465","LatLon":"34.014,-118.465","Shape":["-118.453501,34.02785","-118.452664,34.027862","-118.448812,34.02331","-118.446412,34.02451","-118.444812,34.02011","-118.444812,34.02011","-118.444012,34.01721","-118.456212,34.01011","-118.456212,34.01011","-118.474212,34.00031","-118.481824,33.996954","-118.482941869745,33.9961708933873","-118.482941869745,33.9961708933873","-118.484212,33.99771","-118.486922018235,34.0003031731929","-118.488783153904,34.0020840642078","-118.492692373004,34.0058247335683","-118.492692373004,34.0058247335683","-118.487113,34.00981","-118.487113,34.00981","-118.484013,34.01181","-118.482813,34.01241","-118.466212,34.02121","-118.466212,34.02221","-118.461912,34.02561","-118.455612,34.02771","-118.453501,34.02785"], "Popup": "<span>Zip Code 90405<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" }]);
		
			_this.DrawShapes( 'contourMap', 'los angeles,CA', [{"Zip":"90001","Lat":"33.9754","Lon":"-118.249","LatLon":"33.9754,-118.249","Shape":["-118.243106,33.989214","-118.242806,33.988214","-118.241206,33.988214","-118.241106,33.989114","-118.237706,33.989114","-118.237706,33.989114","-118.232405,33.965314","-118.230205,33.961914","-118.227905,33.960414","-118.225605,33.959614","-118.225605,33.959614","-118.225105,33.958314","-118.230105,33.959414","-118.230705,33.959114","-118.230705,33.957714","-118.230705,33.957714","-118.231705,33.960214","-118.265106,33.960014","-118.265106,33.960014","-118.265206,33.974714","-118.263806,33.974714","-118.263906,33.980514","-118.265207,33.988214","-118.265207,33.988214","-118.257706,33.988114","-118.243106,33.989214"], "Popup": "<span>Zip Code 90001<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90002","Lat":"33.9504","Lon":"-118.247","LatLon":"33.9504,-118.247","Shape":["-118.265106,33.960014","-118.231705,33.960214","-118.230705,33.957714","-118.230705,33.957714","-118.228312,33.946652","-118.228312,33.946652","-118.226981,33.938044","-118.228305,33.937915","-118.228305,33.937915","-118.228505,33.938915","-118.229505,33.939015","-118.265106,33.939215","-118.265106,33.939215","-118.265106,33.960014"], "Popup": "<span>Zip Code 90002<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90003","Lat":"33.9669","Lon":"-118.274","LatLon":"33.9669,-118.274","Shape":["-118.273907,33.989314","-118.265207,33.988214","-118.265207,33.988214","-118.263906,33.980514","-118.263806,33.974714","-118.265206,33.974714","-118.265106,33.960014","-118.265106,33.960014","-118.265106,33.939215","-118.265106,33.939215","-118.265106,33.938215","-118.265106,33.938215","-118.266024,33.938661","-118.273806,33.939115","-118.282506,33.939014","-118.282506,33.939014","-118.282607,33.985014","-118.282707,33.987314","-118.283807,33.989014","-118.283807,33.989014","-118.273907,33.989314"], "Popup": "<span>Zip Code 90003<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90004","Lat":"34.0771","Lon":"-118.311","LatLon":"34.0771,-118.311","Shape":["-118.284607,34.083746","-118.284508,34.07681","-118.282235,34.075805","-118.284174,34.072657","-118.284174,34.072657","-118.284208,34.07091","-118.283308,34.07041","-118.284408,34.06861","-118.284408,34.06861","-118.289908,34.07051","-118.291773,34.0705","-118.294203,34.069235","-118.337209,34.06901","-118.337209,34.06901","-118.33711,34.078309","-118.33861,34.078309","-118.33861,34.083409","-118.33861,34.083409","-118.309309,34.083609","-118.309309,34.083609","-118.284607,34.083746"], "Popup": "<span>Zip Code 90004<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90005","Lat":"34.058","Lon":"-118.305","LatLon":"34.058,-118.305","Shape":["-118.284408,34.063911","-118.282408,34.063011","-118.284208,34.059911","-118.284208,34.056011","-118.284208,34.056011","-118.309109,34.056011","-118.309109,34.056011","-118.315409,34.056011","-118.318709,34.055311","-118.328609,34.05931","-118.336809,34.05851","-118.338109,34.05891","-118.338109,34.05891","-118.336609,34.06201","-118.336609,34.06201","-118.335309,34.06071","-118.326209,34.06081","-118.324509,34.06191","-118.324509,34.06371","-118.324509,34.06371","-118.323109,34.06371","-118.321609,34.06371","-118.320109,34.06371","-118.318709,34.06371","-118.317909,34.06371","-118.317909,34.06371","-118.317909,34.06191","-118.317209,34.06081","-118.309209,34.06091","-118.307909,34.05991","-118.303008,34.059911","-118.301865,34.059941","-118.301708,34.06381","-118.301708,34.06381","-118.299408,34.06381","-118.296689,34.063964","-118.295421,34.063964","-118.293056,34.063923","-118.284408,34.063911"], "Popup": "<span>Zip Code 90005<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90006","Lat":"34.0488","Lon":"-118.293","LatLon":"34.0488,-118.293","Shape":["-118.284208,34.056011","-118.274307,34.051511","-118.274307,34.051511","-118.280008,34.042012","-118.282842,34.039475","-118.282842,34.039475","-118.284802,34.040103","-118.300408,34.040011","-118.300408,34.040011","-118.309008,34.040011","-118.309008,34.040011","-118.309108,34.051011","-118.309808333333,34.0522443333333","-118.310209,34.054711","-118.309109,34.056011","-118.309109,34.056011","-118.284208,34.056011"], "Popup": "<span>Zip Code 90006<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90007","Lat":"34.0282","Lon":"-118.283","LatLon":"34.0282,-118.283","Shape":["-118.282842,34.039475","-118.270707,34.033812","-118.273007,34.030112","-118.270607,34.029112","-118.268207,34.032612","-118.263507,34.030512","-118.263507,34.030512","-118.265907,34.026812","-118.267007,34.027312","-118.273807,34.016813","-118.273907,34.013013","-118.273907,34.013013","-118.281107,34.015913","-118.282807,34.015713","-118.282807,34.014413","-118.285207,34.014413","-118.288207,34.015713","-118.290108,34.018113","-118.294308,34.018112","-118.295808,34.017312","-118.300208,34.017312","-118.300208,34.017312","-118.300208,34.018112","-118.300208,34.018112","-118.300408,34.040011","-118.300408,34.040011","-118.284802,34.040103","-118.282842,34.039475"], "Popup": "<span>Zip Code 90007<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90008","Lat":"34.0078","Lon":"-118.345","LatLon":"34.0078,-118.345","Shape":["-118.317008,34.016612","-118.318054,34.01661","-118.318108,34.014612","-118.317708,34.0121453333333","-118.317008,34.010912","-118.317008,34.009112","-118.317374666667,34.006646","-118.318108,34.005413","-118.318108,34.003613","-118.318108,34.003613","-118.331908,34.003512","-118.335409,34.002312","-118.343409,34.001212","-118.352009,34.001812","-118.354909,33.999612","-118.355809,33.998012","-118.356109,33.996912","-118.355009,33.995712","-118.354909,33.994512","-118.355309,33.994212","-118.356709,33.995312","-118.357709,33.997112","-118.357709,33.997112","-118.359609,33.996712","-118.365209,33.998312","-118.369509,33.998012","-118.369509,33.998012","-118.37301,34.004412","-118.37331,34.011711","-118.37331,34.011711","-118.37261,34.018311","-118.37261,34.018311","-118.338009,34.018312","-118.336109,34.018212","-118.336209,34.016412","-118.335009,34.016512","-118.335009,34.018312","-118.335009,34.018312","-118.317108,34.018312","-118.317008,34.016612"], "Popup": "<span>Zip Code 90008<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90010","Lat":"34.0611","Lon":"-118.31","LatLon":"34.0611,-118.31","Shape":["-118.301708,34.06381","-118.301865,34.059941","-118.303008,34.059911","-118.307909,34.05991","-118.309209,34.06091","-118.317209,34.06081","-118.317909,34.06191","-118.317909,34.06371","-118.317909,34.06371","-118.314109,34.06351","-118.310409,34.06371","-118.309209,34.06381","-118.308009,34.06371","-118.305609,34.06381","-118.302908,34.06381","-118.301708,34.06381"], "Popup": "<span>Zip Code 90010<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90011","Lat":"34.0119","Lon":"-118.259","LatLon":"34.0119,-118.259","Shape":["-118.263507,34.030512","-118.257407,34.027713","-118.257407,34.027713","-118.243306,34.020713","-118.242706,34.018713","-118.242706,34.018713","-118.243506,34.009013","-118.243606,33.989627","-118.243106,33.989214","-118.243106,33.989214","-118.257706,33.988114","-118.265207,33.988214","-118.265207,33.988214","-118.273907,33.989314","-118.273907,33.989314","-118.273907,34.013013","-118.273907,34.013013","-118.273807,34.016813","-118.267007,34.027312","-118.265907,34.026812","-118.263507,34.030512"], "Popup": "<span>Zip Code 90011<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90012","Lat":"34.0708","Lon":"-118.236","LatLon":"34.0708,-118.236","Shape":["-118.240747,34.089274","-118.23752,34.089044","-118.231106,34.08531","-118.228206,34.08321","-118.227406,34.08101","-118.227406,34.08101","-118.226618,34.079946","-118.224806,34.07061","-118.224706,34.067711","-118.227106,34.061811","-118.226634,34.055755","-118.228906,34.053211","-118.230306,34.048012","-118.230306,34.048012","-118.232606,34.047212","-118.237106,34.047212","-118.240106,34.048312","-118.244507,34.051112","-118.248007,34.051012","-118.250207,34.052412","-118.250207,34.052412","-118.256317,34.056415","-118.256317,34.056415","-118.257607,34.057311","-118.257607,34.057311","-118.259907,34.058611","-118.259829,34.059829","-118.256707,34.060711","-118.254207,34.059311","-118.252307,34.062311","-118.253849,34.063054","-118.252207,34.065756","-118.247407,34.069711","-118.247407,34.072511","-118.249007,34.07801","-118.248544,34.081959","-118.247916,34.083578","-118.246678,34.085508","-118.243207,34.08621","-118.240747,34.089274"], "Popup": "<span>Zip Code 90012<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90013","Lat":"34.0461","Lon":"-118.24","LatLon":"34.0461,-118.24","Shape":["-118.250207,34.052412","-118.248007,34.051012","-118.244507,34.051112","-118.240106,34.048312","-118.237106,34.047212","-118.232606,34.047212","-118.230306,34.048012","-118.230306,34.048012","-118.228406,34.038612","-118.228406,34.038612","-118.238406,34.038112","-118.245207,34.042312","-118.245207,34.042312","-118.250907,34.046012","-118.252907,34.049512","-118.254007,34.050312","-118.254007,34.050312","-118.252607,34.051712","-118.251507,34.051012","-118.250207,34.052412"], "Popup": "<span>Zip Code 90013<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90014","Lat":"34.0446","Lon":"-118.253","LatLon":"34.0446,-118.253","Shape":["-118.254007,34.050312","-118.252907,34.049512","-118.250907,34.046012","-118.245207,34.042312","-118.245207,34.042312","-118.250307,34.037212","-118.250307,34.037212","-118.258207,34.043812","-118.258207,34.043812","-118.254007,34.050312"], "Popup": "<span>Zip Code 90014<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90015","Lat":"34.0411","Lon":"-118.268","LatLon":"34.0411,-118.268","Shape":["-118.258207,34.043812","-118.250307,34.037212","-118.250307,34.037212","-118.257407,34.027713","-118.257407,34.027713","-118.263507,34.030512","-118.263507,34.030512","-118.268207,34.032612","-118.270607,34.029112","-118.273007,34.030112","-118.270707,34.033812","-118.282842,34.039475","-118.282842,34.039475","-118.280008,34.042012","-118.274307,34.051511","-118.274307,34.051511","-118.258207,34.043812"], "Popup": "<span>Zip Code 90015<\/span><span><br>Avg Solar Radiation: 999<\/span><span><br>Avg AC Energy: 555<\/span>" },
												   {"Zip":"90016","Lat":"34.0307","Lon":"-118.353","LatLon":"34.0307,-118.353","Shape":["-118.329809,34.039911","-118.331609,34.036511","-118.334009,34.034611","-118.335109,34.032611","-118.335009,34.018312","-118.335009,34.018312","-118.335009,34.016512","-118.336209,34.016412","-118.336109,34.018212","-118.338009,34.018312","-118.37261,34.018311","-118.37261,34.018311","-118.379995,34.018526","-118.381685,34.017747","-118.38511,34.019611","-118.378374,34.021428","-118.371985,34.029523","-118.36961,34.035011","-118.36961,34.035011","-118.36871,34.038211","-118.36871,34.038211","-118.36791,34.039211","-118.35821,34.041911","-118.344409,34.039711","-118.329809,34.039911"],"Popup":"<span><a href=\"\/california\/los angeles\/90016\">Zip Code 90016<\/a><\/span><span><br>Population: 47,019<\/span><span><br>Male Population: 46.17%<\/span><span><br>Female Population: 53.83%<\/span>"},{"Zip":"90017","Lat":"34.0541","Lon":"-118.266","LatLon":"34.0541,-118.266","Shape":["-118.257607,34.057311","-118.256317,34.056415","-118.256317,34.056415","-118.259226,34.053094","-118.254007,34.050312","-118.254007,34.050312","-118.258207,34.043812","-118.258207,34.043812","-118.274307,34.051511","-118.274307,34.051511","-118.268507,34.062211","-118.268507,34.062211","-118.268007,34.061111","-118.25803,34.056838","-118.257607,34.057311"],"Popup":"<span><a href=\"\/california\/los angeles\/90017\">Zip Code 90017<\/a><\/span><span><br>Population: 20,699<\/span><span><br>Male Population: 56.03%<\/span><span><br>Female Population: 43.97%<\/span>"},{"Zip":"90018","Lat":"34.0298","Lon":"-118.318","LatLon":"34.0298,-118.318","Shape":["-118.300408,34.040011","-118.300208,34.018112","-118.300208,34.018112","-118.313261,34.018265","-118.313228,34.017423","-118.317008,34.016612","-118.317008,34.016612","-118.317108,34.018312","-118.335009,34.018312","-118.335009,34.018312","-118.335109,34.032611","-118.334009,34.034611","-118.331609,34.036511","-118.329809,34.039911","-118.329809,34.039911","-118.309008,34.040011","-118.309008,34.040011","-118.300408,34.040011"],"Popup":"<span><a href=\"\/california\/los angeles\/90018\">Zip Code 90018<\/a><\/span><span><br>Population: 46,890<\/span><span><br>Male Population: 47.02%<\/span><span><br>Female Population: 52.98%<\/span>"},{"Zip":"90019","Lat":"34.0501","Lon":"-118.339","LatLon":"34.0501,-118.339","Shape":["-118.36381,34.05841","-118.36111,34.05701","-118.340009,34.05691","-118.338109,34.05891","-118.338109,34.05891","-118.336809,34.05851","-118.328609,34.05931","-118.318709,34.055311","-118.315409,34.056011","-118.309109,34.056011","-118.309109,34.056011","-118.310209,34.054711","-118.309808333333,34.0522443333333","-118.309108,34.051011","-118.309008,34.040011","-118.309008,34.040011","-118.329809,34.039911","-118.329809,34.039911","-118.344409,34.039711","-118.35821,34.041911","-118.36791,34.039211","-118.36871,34.038211","-118.36871,34.038211","-118.37091,34.04151","-118.37091,34.04151","-118.36921,34.04571","-118.36791,34.05171","-118.36611,34.05571","-118.36501,34.05561","-118.36381,34.05821","-118.36381,34.05821","-118.36381,34.05841"],"Popup":"<span><a href=\"\/california\/los angeles\/90019\">Zip Code 90019<\/a><\/span><span><br>Population: 67,917<\/span><span><br>Male Population: 48.41%<\/span><span><br>Female Population: 51.59%<\/span>"},{"Zip":"90020","Lat":"34.0674","Lon":"-118.311","LatLon":"34.0674,-118.311","Shape":["-118.284408,34.06861","-118.284408,34.063911","-118.284408,34.063911","-118.293056,34.063923","-118.295421,34.063964","-118.296689,34.063964","-118.299408,34.06381","-118.301708,34.06381","-118.301708,34.06381","-118.302908,34.06381","-118.305609,34.06381","-118.308009,34.06371","-118.309209,34.06381","-118.310409,34.06371","-118.314109,34.06351","-118.317909,34.06371","-118.317909,34.06371","-118.318709,34.06371","-118.320109,34.06371","-118.321609,34.06371","-118.323109,34.06371","-118.324509,34.06371","-118.324509,34.06371","-118.331609,34.06411","-118.334409,34.06501","-118.337309,34.06491","-118.337309,34.06491","-118.337209,34.06901","-118.337209,34.06901","-118.294203,34.069235","-118.291773,34.0705","-118.289908,34.07051","-118.284408,34.06861"],"Popup":"<span><a href=\"\/california\/los angeles\/90020\">Zip Code 90020<\/a><\/span><span><br>Population: 42,376<\/span><span><br>Male Population: 50.44%<\/span><span><br>Female Population: 49.56%<\/span>"},{"Zip":"90021","Lat":"34.0319","Lon":"-118.241","LatLon":"34.0319,-118.241","Shape":["-118.245207,34.042312","-118.238406,34.038112","-118.228406,34.038612","-118.228406,34.038612","-118.223906,34.018513","-118.223906,34.018513","-118.242706,34.020613","-118.242706,34.018713","-118.242706,34.018713","-118.243306,34.020713","-118.257407,34.027713","-118.257407,34.027713","-118.250307,34.037212","-118.250307,34.037212","-118.245207,34.042312"],"Popup":"<span><a href=\"\/california\/los angeles\/90021\">Zip Code 90021<\/a><\/span><span><br>Population: 2,780<\/span><span><br>Male Population: 70.76%<\/span><span><br>Female Population: 29.24%<\/span>"},{"Zip":"90022","Lat":"34.021","Lon":"-118.156","LatLon":"34.021,-118.156","Shape":["-118.169604,34.051111","-118.169204,34.049111","-118.169904,34.044311","-118.156601,34.044307","-118.156504,34.040711","-118.162004,34.040513","-118.162004,34.037111","-118.156504,34.037111","-118.151603,34.036111","-118.146703,34.033811","-118.142803,34.033111","-118.142803,34.033111","-118.142739,34.023553","-118.130003,34.015812","-118.127403,34.013112","-118.128203,34.007312","-118.128203,34.007312","-118.172304,34.011113","-118.172304,34.011113","-118.174004,34.011513","-118.173604,34.017212","-118.174104,34.024012","-118.174104,34.024012","-118.173604,34.035012","-118.173704,34.046711","-118.17556,34.047403","-118.176004,34.049211","-118.175004,34.050511","-118.170804,34.050611","-118.169604,34.051111"],"Popup":"<span><a href=\"\/california\/los angeles\/90022\">Zip Code 90022<\/a><\/span><span><br>Population: 68,596<\/span><span><br>Male Population: 50.01%<\/span><span><br>Female Population: 49.99%<\/span>"},{"Zip":"90023","Lat":"34.0186","Lon":"-118.198","LatLon":"34.0186,-118.198","Shape":["-118.227606,34.038512","-118.224106,34.039112","-118.217406,34.039112","-118.205405,34.033812","-118.205405,34.033812","-118.192305,34.028212","-118.180204,34.028312","-118.180204,34.023912","-118.174104,34.024012","-118.174104,34.024012","-118.173604,34.017212","-118.174004,34.011513","-118.172304,34.011113","-118.172304,34.011113","-118.194705,34.013013","-118.197005,34.012713","-118.176704,34.005913","-118.173204,34.003313","-118.173504,34.002413","-118.174504,34.001013","-118.178204,34.002213","-118.179504,33.999813","-118.175004,33.998313","-118.175004,33.998313","-118.175761,33.992237","-118.175761,33.992237","-118.200713,34.006461","-118.204605,34.007713","-118.208005,34.007613","-118.217505,34.009013","-118.219905,34.011213","-118.222406,34.014913","-118.227606,34.038512"],"Popup":"<span><a href=\"\/california\/los angeles\/90023\">Zip Code 90023<\/a><\/span><span><br>Population: 47,582<\/span><span><br>Male Population: 50.41%<\/span><span><br>Female Population: 49.59%<\/span>"},{"Zip":"90024","Lat":"34.0678","Lon":"-118.435","LatLon":"34.0678,-118.435","Shape":["-118.425812,34.080808","-118.422912,34.079608","-118.420312,34.074109","-118.414712,34.067109","-118.411712,34.067109","-118.411712,34.067109","-118.410512,34.067109","-118.410512,34.067109","-118.434012,34.050809","-118.441453,34.048642","-118.442259,34.05012","-118.442212,34.051109","-118.447813,34.057809","-118.452054,34.056647","-118.453694,34.058539","-118.453694,34.058539","-118.450049,34.060459","-118.456713,34.069908","-118.455613,34.075808","-118.454913,34.076508","-118.454913,34.076508","-118.453913,34.076908","-118.450113,34.075108","-118.448813,34.073508","-118.445313,34.073708","-118.444513,34.076608","-118.442813,34.077508","-118.439513,34.078208","-118.434213,34.082708","-118.431812,34.082208","-118.428312,34.079808","-118.425812,34.080808"],"Popup":"<span><a href=\"\/california\/los angeles\/90024\">Zip Code 90024<\/a><\/span><span><br>Population: 44,088<\/span><span><br>Male Population: 47.3%<\/span><span><br>Female Population: 52.7%<\/span>"},{"Zip":"90025","Lat":"34.0434","Lon":"-118.45","LatLon":"34.0434,-118.45","Shape":["-118.414012,34.063909","-118.421212,34.059109","-118.416212,34.053109","-118.416212,34.053109","-118.420512,34.050109","-118.449812,34.03321","-118.454012,34.03271","-118.457912,34.036109","-118.461412,34.033309","-118.461412,34.033309","-118.470813,34.041409","-118.470813,34.041409","-118.470213,34.041909","-118.470213,34.041909","-118.464213,34.046809","-118.455343,34.055298","-118.456702,34.05683","-118.453694,34.058539","-118.453694,34.058539","-118.452054,34.056647","-118.447813,34.057809","-118.442212,34.051109","-118.442259,34.05012","-118.441453,34.048642","-118.434012,34.050809","-118.410512,34.067109","-118.410512,34.067109","-118.414012,34.063909"],"Popup":"<span><a href=\"\/california\/los angeles\/90025\">Zip Code 90025<\/a><\/span><span><br>Population: 41,195<\/span><span><br>Male Population: 50.32%<\/span><span><br>Female Population: 49.68%<\/span>"},{"Zip":"90026","Lat":"34.0788","Lon":"-118.267","LatLon":"34.0788,-118.267","Shape":["-118.276608,34.095909","-118.276408,34.095509","-118.275308,34.095409","-118.269708,34.095509","-118.254407,34.08731","-118.250707,34.09341","-118.251607,34.09501","-118.249107,34.09551","-118.246107,34.09521","-118.244207,34.09451","-118.244207,34.09451","-118.240747,34.089274","-118.240747,34.089274","-118.243207,34.08621","-118.246678,34.085508","-118.247916,34.083578","-118.248544,34.081959","-118.249007,34.07801","-118.247407,34.072511","-118.247407,34.069711","-118.252207,34.065756","-118.253849,34.063054","-118.252307,34.062311","-118.254207,34.059311","-118.256707,34.060711","-118.259829,34.059829","-118.259907,34.058611","-118.257607,34.057311","-118.257607,34.057311","-118.25803,34.056838","-118.268007,34.061111","-118.268507,34.062211","-118.268507,34.062211","-118.266607,34.065211","-118.284174,34.072657","-118.284174,34.072657","-118.282235,34.075805","-118.284508,34.07681","-118.284607,34.083746","-118.284607,34.083746","-118.284608,34.08471","-118.277208,34.095909","-118.277208,34.095909","-118.276608,34.095909"],"Popup":"<span><a href=\"\/california\/los angeles\/90026\">Zip Code 90026<\/a><\/span><span><br>Population: 73,410<\/span><span><br>Male Population: 50.29%<\/span><span><br>Female Population: 49.71%<\/span>"},{"Zip":"90027","Lat":"34.1322","Lon":"-118.289","LatLon":"34.1322,-118.289","Shape":["-118.31281,34.154606","-118.31041,34.160506","-118.30951,34.161206","-118.30731,34.160806","-118.30731,34.160806","-118.30411,34.158706","-118.299209,34.157506","-118.298209,34.158206","-118.295809,34.158506","-118.291609,34.155607","-118.285709,34.155807","-118.282209,34.156507","-118.280109,34.156107","-118.279209,34.155107","-118.278709,34.153407","-118.278709,34.153407","-118.277709,34.145407","-118.273308,34.128908","-118.270508,34.121508","-118.265708,34.113909","-118.265908,34.112909","-118.269108,34.111609","-118.271508,34.109109","-118.273508,34.104109","-118.273308,34.101109","-118.274008,34.099009","-118.276608,34.095909","-118.276608,34.095909","-118.277208,34.095909","-118.277208,34.095909","-118.309409,34.095009","-118.309409,34.095009","-118.309409,34.105309","-118.309409,34.105309","-118.307609,34.109208","-118.306509,34.116808","-118.308809,34.120108","-118.305909,34.129108","-118.304309,34.130807","-118.303009,34.134607","-118.302809,34.140307","-118.30911,34.153507","-118.31131,34.154906","-118.31281,34.154606"],"Popup":"<span><a href=\"\/california\/los angeles\/90027\">Zip Code 90027<\/a><\/span><span><br>Population: 48,887<\/span><span><br>Male Population: 49.56%<\/span><span><br>Female Population: 50.44%<\/span>"},{"Zip":"90028","Lat":"34.1005","Lon":"-118.327","LatLon":"34.1005,-118.327","Shape":["-118.309409,34.105309","-118.309409,34.095009","-118.309409,34.095009","-118.311409,34.094909","-118.311409,34.094909","-118.318309,34.094409","-118.34411,34.094309","-118.34411,34.094309","-118.34521,34.094309","-118.34561,34.102608","-118.34491,34.103908","-118.34491,34.103908","-118.34171,34.104008","-118.33751,34.105108","-118.309409,34.105309"],"Popup":"<span><a href=\"\/california\/los angeles\/90028\">Zip Code 90028<\/a><\/span><span><br>Population: 30,337<\/span><span><br>Male Population: 55.35%<\/span><span><br>Female Population: 44.65%<\/span>"},{"Zip":"90029","Lat":"34.0905","Lon":"-118.295","LatLon":"34.0905,-118.295","Shape":["-118.277208,34.095909","-118.284608,34.08471","-118.284607,34.083746","-118.284607,34.083746","-118.309309,34.083609","-118.309309,34.083609","-118.309408,34.093532","-118.311409,34.094909","-118.311409,34.094909","-118.309409,34.095009","-118.309409,34.095009","-118.277208,34.095909"],"Popup":"<span><a href=\"\/california\/los angeles\/90029\">Zip Code 90029<\/a><\/span><span><br>Population: 41,643<\/span><span><br>Male Population: 51.47%<\/span><span><br>Female Population: 48.53%<\/span>"},{"Zip":"90031","Lat":"34.0898","Lon":"-118.235","LatLon":"34.0898,-118.235","Shape":["-118.240747,34.089274","-118.244207,34.09451","-118.244207,34.09451","-118.240307,34.096609","-118.230606,34.09221","-118.228606,34.08991","-118.228006,34.08831","-118.227406,34.08291","-118.227406,34.08291","-118.227406,34.08101","-118.227406,34.08101","-118.228206,34.08321","-118.231106,34.08531","-118.23752,34.089044","-118.240747,34.089274"],"Popup":"<span><a href=\"\/california\/los angeles\/90031\">Zip Code 90031<\/a><\/span><span><br>Population: 38,716<\/span><span><br>Male Population: 49.03%<\/span><span><br>Female Population: 50.97%<\/span>"},{"Zip":"90032","Lat":"34.0841","Lon":"-118.178","LatLon":"34.0841,-118.178","Shape":["-118.155504,34.098509","-118.155604,34.097409","-118.156404,34.096309","-118.158004,34.095109","-118.160904,34.091109","-118.160604,34.088809","-118.160604,34.088809","-118.160404,34.08131","-118.160804,34.07551","-118.164904,34.06481","-118.165401,34.062267","-118.165401,34.062267","-118.169404,34.06191","-118.169404,34.06191","-118.173804,34.060811","-118.179201,34.061036","-118.192805,34.063611","-118.192805,34.063611","-118.196705,34.064711","-118.196705,34.064711","-118.195305,34.06901","-118.194005,34.07581","-118.195005,34.07661","-118.196977,34.073601","-118.202906,34.073603","-118.202905,34.07871","-118.200108,34.082831","-118.197505,34.08301","-118.191436,34.08711","-118.190934,34.089287","-118.191618,34.089635","-118.191736,34.092087","-118.190767,34.097011","-118.190205,34.097309","-118.190205,34.097309","-118.190105,34.093609","-118.182705,34.091109","-118.178205,34.102209","-118.178205,34.102209","-118.178205,34.098609","-118.155504,34.098509"],"Popup":"<span><a href=\"\/california\/los angeles\/90032\">Zip Code 90032<\/a><\/span><span><br>Population: 46,837<\/span><span><br>Male Population: 49.23%<\/span><span><br>Female Population: 50.77%<\/span>"},{"Zip":"90033","Lat":"34.0517","Lon":"-118.212","LatLon":"34.0517,-118.212","Shape":["-118.196705,34.064711","-118.192805,34.063611","-118.192805,34.063611","-118.192505,34.054411","-118.19694,34.049146","-118.203405,34.039012","-118.203405,34.036912","-118.205405,34.033812","-118.205405,34.033812","-118.217406,34.039112","-118.224106,34.039112","-118.227606,34.038512","-118.227606,34.038512","-118.229706,34.047912","-118.228306,34.053111","-118.225906,34.056011","-118.226306,34.062411","-118.226306,34.062411","-118.224106,34.062611","-118.225106,34.060811","-118.223242,34.056811","-118.220806,34.056911","-118.217206,34.059511","-118.215006,34.061911","-118.211406,34.064211","-118.204805,34.065711","-118.202105,34.065711","-118.196705,34.064711"],"Popup":"<span><a href=\"\/california\/los angeles\/90033\">Zip Code 90033<\/a><\/span><span><br>Population: 49,582<\/span><span><br>Male Population: 50.88%<\/span><span><br>Female Population: 49.12%<\/span>"},{"Zip":"90034","Lat":"34.0308","Lon":"-118.392","LatLon":"34.0308,-118.392","Shape":["-118.37091,34.04151","-118.36871,34.038211","-118.36871,34.038211","-118.36961,34.035011","-118.36961,34.035011","-118.37631,34.032311","-118.39031,34.028311","-118.406711,34.019411","-118.413011,34.015711","-118.416011,34.013411","-118.416011,34.013411","-118.418471,34.012019","-118.418471,34.012019","-118.427492,34.023272","-118.429844,34.027049","-118.429844,34.027049","-118.418411,34.03201","-118.415111,34.03201","-118.411211,34.03081","-118.409455,34.02977","-118.403611,34.02921","-118.401511,34.03461","-118.399811,34.03581","-118.398211,34.03541","-118.398111,34.03571","-118.398859,34.04548","-118.398859,34.04548","-118.388011,34.04511","-118.37091,34.04151"],"Popup":"<span><a href=\"\/california\/los angeles\/90034\">Zip Code 90034<\/a><\/span><span><br>Population: 58,055<\/span><span><br>Male Population: 49.02%<\/span><span><br>Female Population: 50.98%<\/span>"},{"Zip":"90035","Lat":"34.0536","Lon":"-118.387","LatLon":"34.0536,-118.387","Shape":["-118.36381,34.05821","-118.36501,34.05561","-118.36611,34.05571","-118.36791,34.05171","-118.36921,34.04571","-118.37091,34.04151","-118.37091,34.04151","-118.388011,34.04511","-118.398859,34.04548","-118.398859,34.04548","-118.402553,34.046353","-118.401531,34.051967","-118.406541,34.052297","-118.406541,34.052297","-118.405954,34.052626","-118.405954,34.052626","-118.405912,34.057109","-118.390011,34.05711","-118.390011,34.05711","-118.383611,34.05701","-118.383611,34.063009","-118.377411,34.063009","-118.377411,34.06081","-118.37631,34.05941","-118.37631,34.05941","-118.36381,34.05821"],"Popup":"<span><a href=\"\/california\/los angeles\/90035\">Zip Code 90035<\/a><\/span><span><br>Population: 27,754<\/span><span><br>Male Population: 47.35%<\/span><span><br>Female Population: 52.65%<\/span>"},{"Zip":"90036","Lat":"34.072","Lon":"-118.349","LatLon":"34.072,-118.349","Shape":["-118.34511,34.083409","-118.33861,34.083409","-118.33861,34.083409","-118.33861,34.078309","-118.33711,34.078309","-118.337209,34.06901","-118.337209,34.06901","-118.337309,34.06491","-118.337309,34.06491","-118.336609,34.06201","-118.336609,34.06201","-118.338109,34.05891","-118.338109,34.05891","-118.340009,34.05691","-118.36111,34.05701","-118.36381,34.05841","-118.36381,34.05841","-118.36151,34.06301","-118.361611,34.083713","-118.361611,34.083713","-118.34511,34.083409"],"Popup":"<span><a href=\"\/california\/los angeles\/90036\">Zip Code 90036<\/a><\/span><span><br>Population: 33,226<\/span><span><br>Male Population: 48.69%<\/span><span><br>Female Population: 51.31%<\/span>"},{"Zip":"90037","Lat":"34.0054","Lon":"-118.287","LatLon":"34.0054,-118.287","Shape":["-118.273907,34.013013","-118.273907,33.989314","-118.273907,33.989314","-118.283807,33.989014","-118.283807,33.989014","-118.300207,33.989213","-118.300207,33.989213","-118.300208,34.017312","-118.300208,34.017312","-118.295808,34.017312","-118.294308,34.018112","-118.290108,34.018113","-118.288207,34.015713","-118.285207,34.014413","-118.282807,34.014413","-118.282807,34.015713","-118.281107,34.015913","-118.273907,34.013013"],"Popup":"<span><a href=\"\/california\/los angeles\/90037\">Zip Code 90037<\/a><\/span><span><br>Population: 56,776<\/span><span><br>Male Population: 50.02%<\/span><span><br>Female Population: 49.98%<\/span>"},{"Zip":"90038","Lat":"34.0899","Lon":"-118.327","LatLon":"34.0899,-118.327","Shape":["-118.311409,34.094909","-118.309408,34.093532","-118.309309,34.083609","-118.309309,34.083609","-118.33861,34.083409","-118.33861,34.083409","-118.34511,34.083409","-118.34511,34.083409","-118.34421,34.085109","-118.34411,34.094309","-118.34411,34.094309","-118.318309,34.094409","-118.311409,34.094909"],"Popup":"<span><a href=\"\/california\/los angeles\/90038\">Zip Code 90038<\/a><\/span><span><br>Population: 32,729<\/span><span><br>Male Population: 53.02%<\/span><span><br>Female Population: 46.98%<\/span>"},{"Zip":"90039","Lat":"34.1036","Lon":"-118.256","LatLon":"34.1036,-118.256","Shape":["-118.275709,34.153607","-118.275309,34.152907","-118.275309,34.152907","-118.262008,34.126908","-118.259208,34.123408","-118.254108,34.118808","-118.254108,34.118808","-118.246007,34.112109","-118.227106,34.09041","-118.225706,34.08691","-118.226206,34.08111","-118.226206,34.08111","-118.226706,34.08101","-118.226706,34.08101","-118.227406,34.08291","-118.227406,34.08291","-118.228006,34.08831","-118.228606,34.08991","-118.230606,34.09221","-118.240307,34.096609","-118.244207,34.09451","-118.244207,34.09451","-118.246107,34.09521","-118.249107,34.09551","-118.251607,34.09501","-118.250707,34.09341","-118.254407,34.08731","-118.269708,34.095509","-118.275308,34.095409","-118.276408,34.095509","-118.276608,34.095909","-118.276608,34.095909","-118.274008,34.099009","-118.273308,34.101109","-118.273508,34.104109","-118.271508,34.109109","-118.269108,34.111609","-118.265908,34.112909","-118.265708,34.113909","-118.270508,34.121508","-118.273308,34.128908","-118.277709,34.145407","-118.278709,34.153407","-118.278709,34.153407","-118.275709,34.153607"],"Popup":"<span><a href=\"\/california\/los angeles\/90039\">Zip Code 90039<\/a><\/span><span><br>Population: 29,279<\/span><span><br>Male Population: 50.96%<\/span><span><br>Female Population: 49.04%<\/span>"},{"Zip":"90040","Lat":"33.9952","Lon":"-118.145","LatLon":"33.9952,-118.145","Shape":["-118.172304,34.011113","-118.128203,34.007312","-118.128203,34.007312","-118.129602,33.993113","-118.125102,33.991113","-118.128302,33.985813","-118.133002,33.987313","-118.134102,33.985613","-118.122702,33.974513","-118.122302,33.974113","-118.122302,33.974113","-118.126602,33.975213","-118.130502,33.973013","-118.130502,33.973013","-118.132702,33.972313","-118.136402,33.972513","-118.150203,33.974113","-118.149361,33.976871","-118.149732,33.977484","-118.167234,33.979336","-118.170604,33.988213","-118.161703,33.987413","-118.159803,33.996413","-118.171904,34.000413","-118.175004,33.998313","-118.175004,33.998313","-118.179504,33.999813","-118.178204,34.002213","-118.174504,34.001013","-118.173504,34.002413","-118.173204,34.003313","-118.176704,34.005913","-118.197005,34.012713","-118.194705,34.013013","-118.172304,34.011113"],"Popup":"<span><a href=\"\/california\/los angeles\/90040\">Zip Code 90040<\/a><\/span><span><br>Population: 9,737<\/span><span><br>Male Population: 48.37%<\/span><span><br>Female Population: 51.63%<\/span>"},{"Zip":"90041","Lat":"34.136","Lon":"-118.207","LatLon":"34.136,-118.207","Shape":["-118.183977,34.149203","-118.184713,34.143879","-118.181905,34.142007","-118.181805,34.140907","-118.182705,34.139007","-118.186505,34.136107","-118.185905,34.135907","-118.185905,34.135907","-118.185905,34.134607","-118.187205,34.133807","-118.188805,34.132907","-118.191231,34.132668","-118.193606,34.131308","-118.194106,34.130408","-118.194506,34.126408","-118.195506,34.126508","-118.194706,34.127608","-118.195206,34.129008","-118.202306,34.129108","-118.20381,34.13016","-118.202906,34.131008","-118.203006,34.132908","-118.209506,34.133908","-118.209506,34.133108","-118.208406,34.132808","-118.208206,34.130708","-118.208739,34.127328","-118.209667,34.125496","-118.210602,34.1259","-118.213306,34.125308","-118.215506,34.120608","-118.213506,34.119408","-118.212906,34.117708","-118.213706,34.116208","-118.215006,34.116408","-118.215006,34.116408","-118.218706,34.117808","-118.224407,34.122308","-118.224907,34.124708","-118.222807,34.129808","-118.223007,34.134608","-118.223307,34.135408","-118.225407,34.135908","-118.228107,34.135608","-118.228107,34.135608","-118.229107,34.146107","-118.229107,34.146107","-118.226307,34.149707","-118.222607,34.149307","-118.210906,34.146407","-118.205506,34.147607","-118.202506,34.150807","-118.198406,34.151507","-118.198306,34.149207","-118.183977,34.149203"],"Popup":"<span><a href=\"\/california\/los angeles\/90041\">Zip Code 90041<\/a><\/span><span><br>Population: 27,875<\/span><span><br>Male Population: 48.23%<\/span><span><br>Female Population: 51.77%<\/span>"},{"Zip":"90042","Lat":"34.1163","Lon":"-118.192","LatLon":"34.1163,-118.192","Shape":["-118.168105,34.123408","-118.168405,34.120508","-118.167655,34.120508","-118.167241,34.118904","-118.168313,34.117","-118.176905,34.112308","-118.178105,34.109408","-118.178205,34.102209","-118.178205,34.102209","-118.182705,34.091109","-118.190105,34.093609","-118.190205,34.097309","-118.190205,34.097309","-118.189205,34.098809","-118.189805,34.100509","-118.192205,34.102809","-118.202106,34.102109","-118.203301,34.100956","-118.203301,34.100956","-118.205806,34.105409","-118.205206,34.101109","-118.206106,34.099209","-118.207206,34.099809","-118.207906,34.102809","-118.206406,34.102109","-118.206684600977,34.10354930625","-118.208106,34.105409","-118.211406,34.107909","-118.215006,34.116408","-118.215006,34.116408","-118.213706,34.116208","-118.212906,34.117708","-118.213506,34.119408","-118.215506,34.120608","-118.213306,34.125308","-118.210602,34.1259","-118.209667,34.125496","-118.208739,34.127328","-118.208206,34.130708","-118.208406,34.132808","-118.209506,34.133108","-118.209506,34.133908","-118.203006,34.132908","-118.202906,34.131008","-118.20381,34.13016","-118.202306,34.129108","-118.195206,34.129008","-118.194706,34.127608","-118.195506,34.126508","-118.194506,34.126408","-118.194106,34.130408","-118.193606,34.131308","-118.191231,34.132668","-118.188805,34.132907","-118.187205,34.133807","-118.185905,34.134607","-118.185905,34.135907","-118.185905,34.135907","-118.185605,34.136007","-118.185905,34.133507","-118.183205,34.129608","-118.181405,34.129408","-118.1802,34.126599","-118.177804,34.126764","-118.176705,34.125008","-118.174505,34.126308","-118.170505,34.126608","-118.168505,34.125908","-118.169505,34.123408","-118.168105,34.123408"],"Popup":"<span><a href=\"\/california\/los angeles\/90042\">Zip Code 90042<\/a><\/span><span><br>Population: 64,828<\/span><span><br>Male Population: 49.37%<\/span><span><br>Female Population: 50.63%<\/span>"},{"Zip":"90043","Lat":"33.9876","Lon":"-118.338","LatLon":"33.9876,-118.338","Shape":["-118.318108,34.003613","-118.317008,34.003613","-118.317108,33.995013","-118.317608,33.992913","-118.317116,33.992093","-118.317108,33.989613","-118.317108,33.989613","-118.317608,33.988913","-118.318608,33.982713","-118.318608,33.979813","-118.317608,33.979813","-118.317608,33.970713","-118.317608,33.970713","-118.326308,33.970813","-118.326308,33.967113","-118.332808,33.967113","-118.335108,33.972413","-118.335108,33.974413","-118.335108,33.974413","-118.335008,33.981613","-118.358309,33.981513","-118.358309,33.981513","-118.358709,33.992912","-118.357709,33.997112","-118.357709,33.997112","-118.356709,33.995312","-118.355309,33.994212","-118.354909,33.994512","-118.355009,33.995712","-118.356109,33.996912","-118.355809,33.998012","-118.354909,33.999612","-118.352009,34.001812","-118.343409,34.001212","-118.335409,34.002312","-118.331908,34.003512","-118.318108,34.003613"],"Popup":"<span><a href=\"\/california\/los angeles\/90043\">Zip Code 90043<\/a><\/span><span><br>Population: 44,875<\/span><span><br>Male Population: 45.86%<\/span><span><br>Female Population: 54.14%<\/span>"},{"Zip":"90044","Lat":"33.9563","Lon":"-118.291","LatLon":"33.9563,-118.291","Shape":["-118.283807,33.989014","-118.282707,33.987314","-118.282607,33.985014","-118.282506,33.939014","-118.282506,33.939014","-118.282404,33.928071","-118.284653,33.928068","-118.2847,33.924808","-118.282406,33.924815","-118.282506,33.920615","-118.284406,33.918515","-118.286406,33.914215","-118.286406,33.914215","-118.286906,33.917915","-118.300306,33.917315","-118.300306,33.917315","-118.300092,33.927197","-118.308802,33.925272","-118.308807,33.930814","-118.300107,33.930814","-118.300207,33.967114","-118.300973666667,33.9695473333333","-118.301307,33.974414","-118.300207,33.976014","-118.300207,33.989213","-118.300207,33.989213","-118.283807,33.989014"],"Popup":"<span><a href=\"\/california\/los angeles\/90044\">Zip Code 90044<\/a><\/span><span><br>Population: 86,075<\/span><span><br>Male Population: 46.99%<\/span><span><br>Female Population: 53.01%<\/span>"},{"Zip":"90045","Lat":"33.9468","Lon":"-118.403","LatLon":"33.9468,-118.403","Shape":["-118.370109,33.978712","-118.369868,33.963746","-118.369868,33.963746","-118.376287,33.961287","-118.377829,33.959813","-118.378709,33.958013","-118.379009,33.952613","-118.370011,33.952615","-118.369922,33.945314","-118.369922,33.945314","-118.36991,33.930226","-118.377497,33.930224","-118.378708,33.930613","-118.378708,33.930613","-118.401806,33.931113","-118.42891,33.930712","-118.42891,33.930712","-118.43391,33.939712","-118.437731,33.949157","-118.431347,33.950242","-118.426702,33.957928","-118.426647,33.959716","-118.429277948242,33.9630935330078","-118.43271,33.964612","-118.43758,33.963049","-118.438305,33.963451","-118.43011,33.966812","-118.42561,33.965512","-118.42811,33.968612","-118.42811,33.968612","-118.41421,33.975212","-118.40491,33.977212","-118.40211,33.982412","-118.40231,33.983512","-118.40071,33.983412","-118.395726,33.981485","-118.387009,33.977412","-118.387009,33.977412","-118.379651,33.976448","-118.371709,33.977312","-118.370109,33.978712"],"Popup":"<span><a href=\"\/california\/los angeles\/90045\">Zip Code 90045<\/a><\/span><span><br>Population: 39,314<\/span><span><br>Male Population: 48.46%<\/span><span><br>Female Population: 51.54%<\/span>"},{"Zip":"90046","Lat":"34.1099","Lon":"-118.368","LatLon":"34.1099,-118.368","Shape":["-118.371911,34.130607","-118.369811,34.129307","-118.361011,34.128007","-118.360511,34.127307","-118.360811,34.126307","-118.358811,34.124607","-118.354711,34.121407","-118.350411,34.119508","-118.34541,34.112008","-118.34611,34.111508","-118.34491,34.103908","-118.34491,34.103908","-118.34561,34.102608","-118.34521,34.094309","-118.34411,34.094309","-118.34411,34.094309","-118.34421,34.085109","-118.34511,34.083409","-118.34511,34.083409","-118.361611,34.083713","-118.361611,34.083713","-118.370439,34.083679","-118.370439,34.083679","-118.370389,34.085359","-118.369211,34.085409","-118.369311,34.087109","-118.370411,34.087109","-118.370724,34.096634","-118.367311,34.098608","-118.367611,34.100508","-118.366311,34.100408","-118.365711,34.101908","-118.366211,34.103508","-118.368411,34.106308","-118.368911,34.107808","-118.370011,34.108008","-118.371011,34.106608","-118.371611,34.106908","-118.374311,34.103408","-118.372811,34.103608","-118.370911,34.105308","-118.371011,34.104608","-118.374511,34.102308","-118.375511,34.102408","-118.376111,34.103008","-118.377311,34.102708","-118.377711,34.103508","-118.379211,34.103108","-118.380111,34.104508","-118.381211,34.104708","-118.382911,34.106208","-118.384011,34.105308","-118.384311,34.106008","-118.385912,34.105908","-118.387012,34.104108","-118.387012,34.104108","-118.386712,34.106108","-118.385311,34.106408","-118.386212,34.107208","-118.390612,34.107908","-118.390212,34.108408","-118.389112,34.108008","-118.387812,34.109008","-118.389551,34.110144","-118.387412,34.111808","-118.388512,34.111908","-118.389912,34.110708","-118.390312,34.111808","-118.38888,34.112312","-118.389612,34.113607","-118.391604,34.112937","-118.392352,34.115127","-118.395012,34.117107","-118.395012,34.116007","-118.398612,34.113607","-118.397512,34.117007","-118.399612,34.115707","-118.398612,34.117607","-118.398212,34.120107","-118.398212,34.120107","-118.397412,34.119107","-118.393512,34.120007","-118.391412,34.122007","-118.387612,34.123407","-118.375711,34.121807","-118.371911,34.130607"],"Popup":"<span><a href=\"\/california\/los angeles\/90046\">Zip Code 90046<\/a><\/span><span><br>Population: 49,870<\/span><span><br>Male Population: 52.46%<\/span><span><br>Female Population: 47.54%<\/span>"},{"Zip":"90047","Lat":"33.9579","Lon":"-118.309","LatLon":"33.9579,-118.309","Shape":["-118.300207,33.989213","-118.300207,33.976014","-118.301307,33.974414","-118.300973666667,33.9695473333333","-118.300207,33.967114","-118.300107,33.930814","-118.308807,33.930814","-118.308802,33.925272","-118.300092,33.927197","-118.300306,33.917315","-118.300306,33.917315","-118.308907,33.917214","-118.308907,33.917214","-118.308809,33.924985","-118.310142,33.924589","-118.313207,33.924832","-118.313207,33.930814","-118.317507,33.930814","-118.317507,33.930814","-118.317607,33.945414","-118.317607,33.945414","-118.317608,33.970713","-118.317608,33.970713","-118.317608,33.979813","-118.318608,33.979813","-118.318608,33.982713","-118.317608,33.988913","-118.317108,33.989613","-118.317108,33.989613","-118.317108,33.988913","-118.300207,33.989213"],"Popup":"<span><a href=\"\/california\/los angeles\/90047\">Zip Code 90047<\/a><\/span><span><br>Population: 47,992<\/span><span><br>Male Population: 46.32%<\/span><span><br>Female Population: 53.68%<\/span>"},{"Zip":"90048","Lat":"34.0725","Lon":"-118.376","LatLon":"34.0725,-118.376","Shape":["-118.361611,34.083713","-118.36151,34.06301","-118.36381,34.05841","-118.36381,34.05841","-118.36381,34.05821","-118.36381,34.05821","-118.37631,34.05941","-118.37631,34.05941","-118.376311,34.06261","-118.37251,34.06141","-118.37161,34.06251","-118.37151,34.06361","-118.375411,34.069109","-118.383811,34.072009","-118.389811,34.072009","-118.389811,34.072009","-118.39098,34.072409","-118.390974,34.075365","-118.389911,34.075409","-118.389911,34.080609","-118.389911,34.080609","-118.385711,34.080609","-118.375411,34.081809","-118.373283,34.083306","-118.370439,34.083679","-118.370439,34.083679","-118.361611,34.083713"],"Popup":"<span><a href=\"\/california\/los angeles\/90048\">Zip Code 90048<\/a><\/span><span><br>Population: 21,380<\/span><span><br>Male Population: 46.87%<\/span><span><br>Female Population: 53.13%<\/span>"},{"Zip":"90049","Lat":"34.0919","Lon":"-118.499","LatLon":"34.0919,-118.499","Shape":["-118.480415,34.130106","-118.476115,34.126006","-118.476115,34.126006","-118.481864,34.118218","-118.482081,34.111323","-118.477201,34.104008","-118.477906,34.098903","-118.475136,34.086092","-118.472393,34.080913","-118.469453,34.078453","-118.466135,34.076798","-118.464944,34.077373","-118.464713,34.079008","-118.465913,34.079008","-118.466413,34.079808","-118.465714,34.085408","-118.463514,34.088208","-118.463014,34.088008","-118.460413,34.081908","-118.457013,34.079808","-118.454913,34.076508","-118.454913,34.076508","-118.455613,34.075808","-118.456713,34.069908","-118.450049,34.060459","-118.453694,34.058539","-118.453694,34.058539","-118.456702,34.05683","-118.455343,34.055298","-118.464213,34.046809","-118.470213,34.041909","-118.470213,34.041909","-118.473013,34.044209","-118.477813,34.046509","-118.48067,34.046311","-118.481066,34.045598","-118.480013,34.044509","-118.483713,34.041509","-118.483713,34.041509","-118.485479666667,34.043609","-118.487413,34.047209","-118.489513,34.046509","-118.494014,34.050308","-118.494014,34.050308","-118.496114,34.052208","-118.495514,34.055408","-118.496814,34.055808","-118.49821,34.055183","-118.499914,34.053108","-118.499614,34.054808","-118.498814,34.056108","-118.497459,34.056862","-118.49828,34.058529","-118.500014,34.058908","-118.499646,34.06285","-118.505401,34.061836","-118.505314,34.066708","-118.513715,34.072508","-118.514015,34.073708","-118.512915,34.074908","-118.516403,34.081932","-118.518015,34.083107","-118.520715,34.088607","-118.525516,34.104407","-118.525616,34.107307","-118.527916,34.118206","-118.529216,34.122006","-118.528616,34.125506","-118.527116,34.129106","-118.527116,34.129106","-118.510716,34.130306","-118.508516,34.131206","-118.504116,34.128006","-118.502616,34.128406","-118.502016,34.130606","-118.502016,34.130606","-118.502216,34.129506","-118.500916,34.129106","-118.496815,34.130506","-118.492815,34.131106","-118.490415,34.131206","-118.490015,34.130606","-118.488067,34.129958","-118.480415,34.130106"],"Popup":"<span><a href=\"\/california\/los angeles\/90049\">Zip Code 90049<\/a><\/span><span><br>Population: 33,560<\/span><span><br>Male Population: 45.73%<\/span><span><br>Female Population: 54.27%<\/span>"},{"Zip":"90056","Lat":"33.9887","Lon":"-118.369","LatLon":"33.9887,-118.369","Shape":["-118.357709,33.997112","-118.358709,33.992912","-118.358309,33.981513","-118.358309,33.981513","-118.370209,33.981612","-118.370109,33.978712","-118.370109,33.978712","-118.371709,33.977312","-118.379651,33.976448","-118.387009,33.977412","-118.387009,33.977412","-118.386344,33.978491","-118.384781,33.978092","-118.378809,33.988612","-118.379203,33.996427","-118.376961,33.998043","-118.374467,33.997661","-118.369509,33.998012","-118.369509,33.998012","-118.365209,33.998312","-118.359609,33.996712","-118.357709,33.997112"],"Popup":"<span><a href=\"\/california\/los angeles\/90056\">Zip Code 90056<\/a><\/span><span><br>Population: 8,038<\/span><span><br>Male Population: 44.38%<\/span><span><br>Female Population: 55.62%<\/span>"},{"Zip":"90057","Lat":"34.0634","Lon":"-118.276","LatLon":"34.0634,-118.276","Shape":["-118.284174,34.072657","-118.266607,34.065211","-118.268507,34.062211","-118.268507,34.062211","-118.274307,34.051511","-118.274307,34.051511","-118.284208,34.056011","-118.284208,34.056011","-118.284208,34.059911","-118.282408,34.063011","-118.284408,34.063911","-118.284408,34.063911","-118.284408,34.06861","-118.284408,34.06861","-118.283308,34.07041","-118.284208,34.07091","-118.284174,34.072657"],"Popup":"<span><a href=\"\/california\/los angeles\/90057\">Zip Code 90057<\/a><\/span><span><br>Population: 44,102<\/span><span><br>Male Population: 52.92%<\/span><span><br>Female Population: 47.08%<\/span>"},{"Zip":"90058","Lat":"34.0044","Lon":"-118.221","LatLon":"34.0044,-118.221","Shape":["-118.242706,34.018713","-118.242706,34.020613","-118.223906,34.018513","-118.223906,34.018513","-118.222606,34.014313","-118.218505,34.009013","-118.208005,34.006713","-118.204605,34.006913","-118.201305,34.005713","-118.182204,33.994613","-118.182204,33.994613","-118.182904,33.993813","-118.197505,33.996113","-118.204114,33.996646","-118.204205,33.989314","-118.204205,33.989314","-118.204105,33.983514","-118.212605,33.984114","-118.212905,33.989814","-118.216205,33.992814","-118.223603,33.993404","-118.227644,33.993005","-118.227806,33.990214","-118.230306,33.989214","-118.237706,33.989114","-118.237706,33.989114","-118.241106,33.989114","-118.241206,33.988214","-118.242806,33.988214","-118.243106,33.989214","-118.243106,33.989214","-118.243606,33.989627","-118.243506,34.009013","-118.242706,34.018713"],"Popup":"<span><a href=\"\/california\/los angeles\/90058\">Zip Code 90058<\/a><\/span><span><br>Population: 3,495<\/span><span><br>Male Population: 50.24%<\/span><span><br>Female Population: 49.76%<\/span>"},{"Zip":"90059","Lat":"33.9322","Lon":"-118.245","LatLon":"33.9322,-118.245","Shape":["-118.265106,33.939215","-118.229505,33.939015","-118.228505,33.938915","-118.228305,33.937915","-118.228305,33.937915","-118.22678,33.937095","-118.225316,33.929968","-118.225443,33.929389","-118.230105,33.928654","-118.229468,33.926235","-118.229468,33.926235","-118.228685,33.923257","-118.239005,33.923315","-118.239205,33.920915","-118.246205,33.920915","-118.249705,33.919715","-118.254405,33.917315","-118.254505,33.909215","-118.260905,33.909215","-118.260805,33.902415","-118.260805,33.902415","-118.265305,33.902115","-118.265305,33.902115","-118.265106,33.938215","-118.265106,33.938215","-118.265106,33.939215"],"Popup":"<span><a href=\"\/california\/los angeles\/90059\">Zip Code 90059<\/a><\/span><span><br>Population: 37,956<\/span><span><br>Male Population: 46.34%<\/span><span><br>Female Population: 53.66%<\/span>"},{"Zip":"90061","Lat":"33.9228","Lon":"-118.274","LatLon":"33.9228,-118.274","Shape":["-118.265106,33.938215","-118.265305,33.902115","-118.265305,33.902115","-118.282606,33.901815","-118.282606,33.915215","-118.284806,33.915115","-118.286506,33.912715","-118.286506,33.912715","-118.286406,33.914215","-118.286406,33.914215","-118.284406,33.918515","-118.282506,33.920615","-118.282406,33.924815","-118.2847,33.924808","-118.284653,33.928068","-118.282404,33.928071","-118.282506,33.939014","-118.282506,33.939014","-118.273806,33.939115","-118.266024,33.938661","-118.265106,33.938215"],"Popup":"<span><a href=\"\/california\/los angeles\/90061\">Zip Code 90061<\/a><\/span><span><br>Population: 24,788<\/span><span><br>Male Population: 48.54%<\/span><span><br>Female Population: 51.46%<\/span>"},{"Zip":"90062","Lat":"34.0054","Lon":"-118.309","LatLon":"34.0054,-118.309","Shape":["-118.300208,34.018112","-118.300208,34.017312","-118.300208,34.017312","-118.300207,33.989213","-118.300207,33.989213","-118.317108,33.988913","-118.317108,33.989613","-118.317108,33.989613","-118.317116,33.992093","-118.317608,33.992913","-118.317108,33.995013","-118.317008,34.003613","-118.318108,34.003613","-118.318108,34.003613","-118.318108,34.005413","-118.317374666667,34.006646","-118.317008,34.009112","-118.317008,34.010912","-118.317708,34.0121453333333","-118.318108,34.014612","-118.318054,34.01661","-118.317008,34.016612","-118.317008,34.016612","-118.313228,34.017423","-118.313261,34.018265","-118.300208,34.018112"],"Popup":"<span><a href=\"\/california\/los angeles\/90062\">Zip Code 90062<\/a><\/span><span><br>Population: 29,236<\/span><span><br>Male Population: 47.12%<\/span><span><br>Female Population: 52.88%<\/span>"},{"Zip":"90063","Lat":"34.0462","Lon":"-118.186","LatLon":"34.0462,-118.186","Shape":["-118.192805,34.063611","-118.179201,34.061036","-118.173804,34.060811","-118.169404,34.06191","-118.169404,34.06191","-118.169604,34.051111","-118.169604,34.051111","-118.170804,34.050611","-118.175004,34.050511","-118.176004,34.049211","-118.17556,34.047403","-118.173704,34.046711","-118.173604,34.035012","-118.174104,34.024012","-118.174104,34.024012","-118.180204,34.023912","-118.180204,34.028312","-118.192305,34.028212","-118.205405,34.033812","-118.205405,34.033812","-118.203405,34.036912","-118.203405,34.039012","-118.19694,34.049146","-118.192505,34.054411","-118.192805,34.063611"],"Popup":"<span><a href=\"\/california\/los angeles\/90063\">Zip Code 90063<\/a><\/span><span><br>Population: 55,797<\/span><span><br>Male Population: 50.11%<\/span><span><br>Female Population: 49.89%<\/span>"},{"Zip":"90064","Lat":"34.0405","Lon":"-118.418","LatLon":"34.0405,-118.418","Shape":["-118.416212,34.053109","-118.414511,34.054809","-118.413812,34.056709","-118.408211,34.05131","-118.406541,34.052297","-118.406541,34.052297","-118.401531,34.051967","-118.402553,34.046353","-118.398859,34.04548","-118.398859,34.04548","-118.398111,34.03571","-118.398211,34.03541","-118.399811,34.03581","-118.401511,34.03461","-118.403611,34.02921","-118.409455,34.02977","-118.411211,34.03081","-118.415111,34.03201","-118.418411,34.03201","-118.429844,34.027049","-118.429844,34.027049","-118.431511,34.02621","-118.437312,34.02091","-118.439612,34.01961","-118.440612,34.02081","-118.444812,34.02011","-118.444812,34.02011","-118.446412,34.02451","-118.448812,34.02331","-118.452664,34.027862","-118.453501,34.02785","-118.453501,34.02785","-118.452912,34.02811","-118.456912,34.02981","-118.461412,34.033309","-118.461412,34.033309","-118.457912,34.036109","-118.454012,34.03271","-118.449812,34.03321","-118.420512,34.050109","-118.416212,34.053109"],"Popup":"<span><a href=\"\/california\/los angeles\/90064\">Zip Code 90064<\/a><\/span><span><br>Population: 24,227<\/span><span><br>Male Population: 47.58%<\/span><span><br>Female Population: 52.42%<\/span>"},{"Zip":"90065","Lat":"34.1115","Lon":"-118.229","LatLon":"34.1115,-118.229","Shape":["-118.253508,34.124108","-118.239507,34.126208","-118.235371,34.126168","-118.236607,34.131508","-118.236607,34.134508","-118.233807,34.135608","-118.228107,34.135608","-118.228107,34.135608","-118.225407,34.135908","-118.223307,34.135408","-118.223007,34.134608","-118.222807,34.129808","-118.224907,34.124708","-118.224407,34.122308","-118.218706,34.117808","-118.215006,34.116408","-118.215006,34.116408","-118.211406,34.107909","-118.208106,34.105409","-118.206684600977,34.10354930625","-118.206406,34.102109","-118.207906,34.102809","-118.207206,34.099809","-118.206106,34.099209","-118.205206,34.101109","-118.205806,34.105409","-118.203301,34.100956","-118.203301,34.100956","-118.211306,34.091109","-118.211706,34.08901","-118.213906,34.08641","-118.219406,34.08441","-118.225906,34.08021","-118.226206,34.08111","-118.226206,34.08111","-118.225706,34.08691","-118.227106,34.09041","-118.246007,34.112109","-118.254108,34.118808","-118.254108,34.118808","-118.251107,34.121008","-118.253608,34.123508","-118.253508,34.124108"],"Popup":"<span><a href=\"\/california\/los angeles\/90065\">Zip Code 90065<\/a><\/span><span><br>Population: 47,309<\/span><span><br>Male Population: 49.58%<\/span><span><br>Female Population: 50.42%<\/span>"},{"Zip":"90066","Lat":"34.0067","Lon":"-118.435","LatLon":"34.0067,-118.435","Shape":["-118.429844,34.027049","-118.427492,34.023272","-118.418471,34.012019","-118.418471,34.012019","-118.418938,34.011754","-118.414849,34.004139","-118.41501,33.997211","-118.418767,33.992171","-118.41911,33.989611","-118.41591,33.987011","-118.41591,33.987011","-118.424,33.980722","-118.424,33.980722","-118.428685,33.981316","-118.434611,33.990011","-118.440311,33.991011","-118.444311,33.992311","-118.445311,33.994211","-118.445311,33.994211","-118.444411,33.994711","-118.456212,34.01011","-118.456212,34.01011","-118.444012,34.01721","-118.444812,34.02011","-118.444812,34.02011","-118.440612,34.02081","-118.439612,34.01961","-118.437312,34.02091","-118.431511,34.02621","-118.429844,34.027049"],"Popup":"<span><a href=\"\/california\/los angeles\/90066\">Zip Code 90066<\/a><\/span><span><br>Population: 55,556<\/span><span><br>Male Population: 50.04%<\/span><span><br>Female Population: 49.96%<\/span>"},{"Zip":"90067","Lat":"34.0584","Lon":"-118.416","LatLon":"34.0584,-118.416","Shape":["-118.414012,34.063909","-118.414479,34.062604","-118.405954,34.052626","-118.405954,34.052626","-118.406541,34.052297","-118.406541,34.052297","-118.408211,34.05131","-118.413812,34.056709","-118.414511,34.054809","-118.416212,34.053109","-118.416212,34.053109","-118.421212,34.059109","-118.414012,34.063909"],"Popup":"<span><a href=\"\/california\/los angeles\/90067\">Zip Code 90067<\/a><\/span><span><br>Population: 2,573<\/span><span><br>Male Population: 45.63%<\/span><span><br>Female Population: 54.37%<\/span>"},{"Zip":"90068","Lat":"34.1332","Lon":"-118.326","LatLon":"34.1332,-118.326","Shape":["-118.32421,34.154206","-118.321541,34.155706","-118.31771,34.156106","-118.31601,34.154606","-118.31301,34.153806","-118.31281,34.154606","-118.31281,34.154606","-118.31131,34.154906","-118.30911,34.153507","-118.302809,34.140307","-118.303009,34.134607","-118.304309,34.130807","-118.305909,34.129108","-118.308809,34.120108","-118.306509,34.116808","-118.307609,34.109208","-118.309409,34.105309","-118.309409,34.105309","-118.33751,34.105108","-118.34171,34.104008","-118.34491,34.103908","-118.34491,34.103908","-118.34611,34.111508","-118.34541,34.112008","-118.350411,34.119508","-118.354711,34.121407","-118.358811,34.124607","-118.360811,34.126307","-118.360511,34.127307","-118.361011,34.128007","-118.369811,34.129307","-118.371911,34.130607","-118.371911,34.130607","-118.371411,34.131007","-118.372311,34.131607","-118.374812,34.131607","-118.374312,34.135107","-118.373712,34.135707","-118.367211,34.130907","-118.366211,34.131107","-118.365511,34.131307","-118.362811,34.134407","-118.363011,34.137507","-118.362611,34.138507","-118.362611,34.138507","-118.358711,34.139407","-118.352713,34.134302","-118.348948,34.132577","-118.344311,34.135907","-118.343045,34.137763","-118.345111,34.142407","-118.345111,34.142407","-118.341111,34.145107","-118.341111,34.145107","-118.33181,34.148107","-118.32421,34.154206"],"Popup":"<span><a href=\"\/california\/los angeles\/90068\">Zip Code 90068<\/a><\/span><span><br>Population: 21,514<\/span><span><br>Male Population: 55.52%<\/span><span><br>Female Population: 44.48%<\/span>"},{"Zip":"90071","Lat":"34.0537","Lon":"-118.255","LatLon":"34.0537,-118.255","Shape":["-118.250207,34.052412","-118.251507,34.051012","-118.252607,34.051712","-118.254007,34.050312","-118.254007,34.050312","-118.259226,34.053094","-118.256317,34.056415","-118.256317,34.056415","-118.250207,34.052412"],"Popup":"<span><a href=\"\/california\/los angeles\/90071\">Zip Code 90071<\/a><\/span>"},{"Zip":"90077","Lat":"34.1063","Lon":"-118.458","LatLon":"34.1063,-118.458","Shape":["-118.437714,34.131206","-118.436714,34.130407","-118.435913,34.128207","-118.435513,34.124207","-118.436817,34.121991","-118.434613,34.116007","-118.437213,34.102907","-118.434713,34.099908","-118.432613,34.099708","-118.431013,34.098408","-118.429713,34.094708","-118.431313,34.094408","-118.435413,34.096008","-118.434913,34.092208","-118.433313,34.091808","-118.430013,34.088808","-118.425612,34.081608","-118.425812,34.080808","-118.425812,34.080808","-118.428312,34.079808","-118.431812,34.082208","-118.434213,34.082708","-118.439513,34.078208","-118.442813,34.077508","-118.444513,34.076608","-118.445313,34.073708","-118.448813,34.073508","-118.450113,34.075108","-118.453913,34.076908","-118.454913,34.076508","-118.454913,34.076508","-118.457013,34.079808","-118.460413,34.081908","-118.463014,34.088008","-118.463514,34.088208","-118.465714,34.085408","-118.466413,34.079808","-118.465913,34.079008","-118.464713,34.079008","-118.464944,34.077373","-118.466135,34.076798","-118.469453,34.078453","-118.472393,34.080913","-118.475136,34.086092","-118.477906,34.098903","-118.477201,34.104008","-118.482081,34.111323","-118.481864,34.118218","-118.476115,34.126006","-118.476115,34.126006","-118.474815,34.126306","-118.473215,34.129306","-118.471615,34.130906","-118.469015,34.129506","-118.467415,34.129206","-118.461714,34.130606","-118.453214,34.131806","-118.443414,34.130006","-118.442514,34.130506","-118.442514,34.130506","-118.437714,34.131206"],"Popup":"<span><a href=\"\/california\/los angeles\/90077\">Zip Code 90077<\/a><\/span><span><br>Population: 10,473<\/span><span><br>Male Population: 49.86%<\/span><span><br>Female Population: 50.14%<\/span>"}] );
			
			
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
		contourMapWidget: function() {
			$( ".wrapperGoogle" ).draggable({ handle: ".draggable", containment: "parent" });
			$(".exit").on("click", function() {
				var contour = $(this).closest(".wrapperGoogle"),
					id = contour.attr("id");
				contour.remove();
				$("." + id + "_window").remove();
				
				// nullify gMap
				gMap = null;
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


