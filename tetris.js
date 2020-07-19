function keydown(e) {
	if ( browser == "IE" ) {
		var key = event.keyCode;
	} else {
		var key = e.which;
	}
	if ( piece_type != "" ) {
		if ( key == 37) {
			piece_bump_left();
			if ( ( piece_x > 0 ) && ( piece_bumped == 0 ) ) {
				piece_erase();
				piece_x = piece_x - 1;
				piece_draw();
			}
		}
		if ( key == 38 ) {
			// rotate piece here...add collision detection thingy.
		}
		if ( key == 39 ) {
			piece_bump_right();
			if ( ( piece_x + piece_shape[0].length < grid_width ) && ( piece_bumped == 0 ) ) {
				piece_erase();
				piece_x = piece_x + 1;
				piece_draw();
			}
		}
		if ( key == 40 ) {
			piece_bump();
			if ( ( (piece_y+piece_shape.length)+1 <= grid_height ) && ( piece_bumped == 0 ) ) {
				piece_erase();
				piece_y = piece_y + 1;
				piece_draw();
			} else {
				line_check();
				line_removing();
			}
		}
		if ( key == 32 ) {
			piece_bump();
			while ( ( (piece_y+piece_shape.length)+1 <= grid_height ) && ( piece_bumped == 0 ) ) {
				piece_erase();
				piece_y++;
				piece_draw();
				piece_bump();
			}
			line_check();
			line_removing();
		}
	}
}

function piece_archive() {
	piece1_0 = [
		["","piece1.png",""],
		["piece1.png","piece1.png","piece1.png"]
	];

	piece2_0 = [
		["piece2.png","piece2.png","piece2.png"],
		["","","piece2.png"]
	];

	piece3_0 = [
		["piece3.png","piece3.png"],
		["piece3.png","piece3.png"]
	];

	piece4_0 = [
		["","piece4.png","piece4.png"],
		["piece4.png","piece4.png",""]
	];

	piece5_0 = [
		["","piece5.png"],
		["piece5.png","piece5.png",""],
		["piece5.png",""]
	];

	piece6_0 = [
		["piece6a.png"],
		["piece6b.png"],
		["piece6b.png"],
		["piece6c.png"]
	];

	piece6_1 = [
		["","","",""],
		["piece6d.png","piece6e.png","piece6e.png","piece6f.png"]
	];

	piece7_0 = [
		["piece7.png","piece7.png","piece7.png"],
		["piece7.png","",""]
	];
}


function grid_clear() {
	for ( let i = 0; i < grid_height; i++ ) {
		for ( let j = 0; j < grid_width; j++ ) {
			document.getElementById("cellx"+j+"y"+i+"").src = "images/misc/blank.png";
		}
	}
}


function grid_draw() {
	document.write('<table border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">');
	for ( let j = 0; j < grid_height; j++ ) {
		document.write('<tr>');
		for ( i = 0; i < grid_width; i++ ) {
			document.write('<td width="'+cell_size+'" height="'+cell_size+'">');
			document.write('<img id="cellx'+i+'y'+j+'" src="images/misc/blank.png" border="0" width="'+cell_size+'" height="'+cell_size+'">');
			document.write('</td>');
		}
		document.write('</tr>');
	}
	document.write('</table>');
}


function next_grid_draw() {
	document.write('<table border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">');
	for ( let j = 0; j < next_grid_height; j++ ) {
		document.write('<tr>');
		for ( i = 0; i < next_grid_width; i++ ) {
			document.write('<td width="'+cell_size+'" height="'+cell_size+'">');
			document.write('<img id="nextcellx'+i+'y'+j+'" src="images/misc/blank.png" border="0" width="'+cell_size+'" height="'+cell_size+'">');
			document.write('</td>');
		}
		document.write('</tr>');
	}
	document.write('</table>');
}


function piece_new() {
	if ( piece_next == "" ) {
		piece_type = Math.round(Math.random()*6)+1;
	} else {
		piece_type = piece_next;
	}
	piece_next = Math.round(Math.random()*6)+1;
	piece_shape = new Array();
	for ( let i = 0, ilen = eval("piece"+piece_type+"_"+piece_rotate+".length"); i < ilen; i++ ) {
		piece_shape[i] = new Array();
		for ( let j = 0, jlen = eval("piece"+piece_type+"_"+piece_rotate+"[i].length"); j < jlen; j++ ) {
			piece_shape[i][j] = eval("piece"+piece_type+"_"+piece_rotate+"[i][j]");
		}
	}
}


function piece_draw() {
	for ( let i = 0, ilen = piece_shape.length; i < ilen; i++ ) {
		for ( let j = 0, jlen = piece_shape[i].length; j < jlen; j++ ) {
			if ( piece_shape[i][j] != "" ) {
				if ( piece_y+i >= 0 ) {
					document.getElementById("cellx"+(piece_x+j)+"y"+(piece_y+i)+"").src = "images/pieces/"+piece_shape[i][j];
				}
			}
		}
	}
}


function next_piece_draw() {
	for ( let i = 0; i < next_grid_width; i++ ) {
		for ( let j = 0; j < next_grid_height; j++ ) {
			document.getElementById("nextcellx"+j+"y"+i+"").src = "images/misc/blank.png";
		}
	}

	for ( let i = 0, ilen = eval("piece"+piece_next+"_"+piece_rotate+".length"); i < ilen; i++ ) {
		for ( let j = 0, jlen = eval("piece"+piece_next+"_"+piece_rotate+"[i].length"); j < jlen; j++ ) {
			if ( eval("piece"+piece_next+"_"+piece_rotate+"[i][j]") != "" ) {
				document.getElementById("nextcellx"+j+"y"+i+"").src = "images/pieces/"+eval("piece"+piece_next+"_"+piece_rotate+"[i][j]");
			}
		}
	}
}


function piece_erase() {
	for ( let i = 0, ilen = piece_shape.length; i < ilen; i++ ) {
		for ( j = 0, jlen = piece_shape[i].length; j < jlen; j++ ) {
			if ( piece_shape[i][j] != "" ) {
				if ( piece_y+i >= 0 ) {
					document.getElementById("cellx"+(piece_x+j)+"y"+(piece_y+i)+"").src = "images/misc/blank.png";
				}
			}
		}
	}
}

function piece_bump_left() {
	piece_bumped = 0;
	for ( let i = 0, ilen = piece_shape.length; i < ilen; i++ ) {
		if (
			( piece_y+i >= 0 ) &&
			( piece_y+i < grid_height )
		) {
			for ( j = piece_shape[i].length-1; j >= 0; j-- ) {
				if (
					( piece_x+j-1 >= 0 ) &&
					( piece_x+j-1 < grid_width )
				) {
					if ( piece_shape[i][j] != "" ) {
						if ( document.getElementById("cellx"+(piece_x+j-1)+"y"+(piece_y+i)+"").src.substring(document.getElementById("cellx"+(piece_x+j-1)+"y"+(piece_y+i)+"").src.length-9,document.getElementById("cellx"+(piece_x+j-1)+"y"+(piece_y+i)+"").src.length) != "blank.png" ) {
							if ( j > 0 ) {
								if ( piece_shape[i][j-1] == "" ) {
									piece_bumped = 1;
								}
							}
							if ( j == 0 ) {
								piece_bumped = 1;
							}
						}
					}
				}
			}
		}
	}
}


function piece_bump_right() {
	piece_bumped = 0;
	for ( let i = 0, ilen = piece_shape.length; i < ilen; i++ ) {
		if (
			( piece_y+i >= 0 ) &&
			( piece_y+i < grid_height )
		) {
			for ( let j = 0, jlen = piece_shape[i].length; j < jlen; j++ ) {
				if (
					( piece_x+j+1 >= 0 ) &&
					( piece_x+j+1 < grid_width )
				) {
					if ( piece_shape[i][j] != "" ) {
						if ( document.getElementById("cellx"+(piece_x+j+1)+"y"+(piece_y+i)+"").src.substring(document.getElementById("cellx"+(piece_x+j+1)+"y"+(piece_y+i)+"").src.length-9,document.getElementById("cellx"+(piece_x+j+1)+"y"+(piece_y+i)+"").src.length) != "blank.png" ) {
							if ( j < piece_shape[i].length-1 ) {
								if ( piece_shape[i][j+1] == "" ) {
									piece_bumped = 1;
								}
							}
							if ( j == piece_shape[i].length-1 ) {
								piece_bumped = 1;
							}
						}
					}
				}
			}
		}
	}
}

function piece_bump() {
	piece_bumped = 0;
	for ( let i = 0, ilen = piece_shape.length; i < ilen; i++ ) {
		if (
			( piece_y+i+1 >= 0 ) &&
			( piece_y+i+1 < grid_height )
		) {
			for ( let j = 0, jlen = piece_shape[i].length; j < jlen; j++ ) {
				if (
					( piece_x+j >= 0 ) &&
					( piece_x+j < grid_width )
				) {
					if ( piece_shape[i][j] != "" ) {
						if ( document.getElementById("cellx"+(piece_x+j)+"y"+(piece_y+i+1)+"").src.substring(document.getElementById("cellx"+(piece_x+j)+"y"+(piece_y+i+1)+"").src.length-9,document.getElementById("cellx"+(piece_x+j)+"y"+(piece_y+i+1)+"").src.length) != "blank.png" ) {
							if ( i < piece_shape.length-1 ) {
								if ( piece_shape[i+1][j] == "" ) {
									piece_bumped = 1;
								}
							}
							if ( i == piece_shape.length-1 ) {
								piece_bumped = 1;
							}
						}
					}
				}
			}
		}
	}
}


function line_removing() {
	if ( line_removal == 0 ) {
		for ( let i = 0, ilen = line_remove.length; i < ilen; i++ ) {
			if ( line_remove[i] == 1 ) {
				line_remove[i] = new Array();
				for ( let j = 0; j < grid_width; j++ ) {
					line_remove[i][j] = document.getElementById("cellx"+j+"y"+(piece_y+i)+"").src;
				}
				clearTimeout(timer);
				line_removal = 1;
				timer = setTimeout("line_removing();",100);
			}
		}
	} else if ( ( line_removal > 0 ) && ( line_removal < 6 ) ) {
		for ( let i = 0, ilen = line_remove.length; i < ilen; i++ ) {
			if ( line_remove[i] != "0" ) {
				for ( let j = 0; j < grid_width; j++ ) {
					if ( ( line_removal == 1 ) || ( line_removal == 3 ) || ( line_removal == 5 ) ) {
						document.getElementById("cellx"+j+"y"+(piece_y+i)+"").src = "images/misc/blank.png";
					} else if ( ( line_removal == 2 ) || ( line_removal == 4 ) ) {
						document.getElementById("cellx"+j+"y"+(piece_y+i)+"").src = line_remove[i][j];
					}
				}
			}
		}
		line_removal++;
		timer = setTimeout("line_removing();",100);
	} else {
		lines_removed = 0;
		for ( let i = line_remove.length-1; i >= 0; i-- ) {
			if ( line_remove[i] != "0" ) {
				for ( let j = piece_y+lines_removed+i; j > 0; j-- ) {
					for ( let k = 0; k < grid_width; k++ ) {
						document.getElementById("cellx"+k+"y"+j+"").src = document.getElementById("cellx"+k+"y"+(j-1)+"").src;
					}
				}
				lines_removed++;
			}
		}

		piece_bumped = 0;
		piece_type = "";
		piece_y = 0;
		line_removal = 0;
		clearTimeout(timer);
		timer = setTimeout("animate();",delay);
	}
}


function line_check() {
	line_remove = new Array();
	for ( let i = 0, ilen = piece_shape.length; i < ilen; i++ ) {
		line_remove[i] = 1;
		for ( let j = 0; j < grid_width; j++ ) {
			if ( document.getElementById("cellx"+j+"y"+(piece_y+i)+"").src.substring(document.getElementById("cellx"+j+"y"+(piece_y+i)+"").src.length-9,document.getElementById("cellx"+j+"y"+(piece_y+i)+"").src.length) == "blank.png" ) {
				line_remove[i] = 0;
			}
		}
	}
}

function animate() {
	// if we have a piece selected, move it down
	if ( piece_type != "" ) { piece_bump(); }


	if (
		( (piece_y+piece_shape.length)+1 > grid_height ) ||
		( piece_bumped == 1 )
	) {
		if ( piece_y < 0 ) {
			grid_clear();
		} else {
			line_check();
			line_removing();
		}

		piece_bumped = 0;
		piece_type = "";
		piece_y = 0;
	} else {
		if ( piece_type == "" ) {
			piece_new();
			next_piece_draw();
			piece_y = 0-piece_shape.length;
			piece_x = 4;
			piece_rotate = 0;
		} else {
			piece_erase();
		}
		piece_y++;
		piece_draw();
	}

	timer = setTimeout("animate();",delay);
}


function init() {
	cell_size = 8;
	grid_width = 10;
	grid_height = 18;
	next_grid_width = 4;
	next_grid_height = 4;
	piece_next = "";
	piece_shape = "";
	piece_x = 4;
	piece_y = -1;
	piece_type = "";
	piece_bumped = 0;
	delay = 200;
	line_removal = 0;
	piece_rotate = 0;
	if ( document.all ) { browser = "IE" } else { browser = "NS" }

	document.onkeydown = keydown;

	document.write('<table border="0" bgcolor="#DDDDDD">');
		document.write('<tr>');
			document.write('<td>');
				grid_draw();
			document.write('</td>');
			document.write('<td valign="top">');
				next_grid_draw();
			document.write('</td>');
		document.write('</tr>');
	document.write('</table>');
	piece_archive();
	animate();
}

init();
