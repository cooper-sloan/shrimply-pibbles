function gen_rand_chords() {
	var c_minor = [60,63,67];
	var g_minor = [55,58,62];
	var a_flat = [56,60,63];
	var f_minor = [53,56,60];

	var c_major = [60,64,67];
	var a_minor = [57,60,64];
	var f_major = [53,57,60];
	var g_major = [55,59,62];
	var e_minor = [52,56,59];

	var d_sharp = [51,55,58];
	var a_sharp = [58,62,65];
	var b_sharp_minor = [60,63,67];
	var g_sharp = [56,60,63];

	var d_minor = [50,53,56];
	var e_flat = [51,55,58];

	d_flat = [49,53,56];
	b_flat_minor = [58,62,65];

	chord_prog1 = [c_minor,g_minor,a_flat,f_minor];
	chord_prog2 = [d_sharp,a_sharp,b_sharp_minor,g_sharp];
	chord_prog3 = [g_minor,d_minor,e_flat,c_minor];
	chord_prog4 = [f_minor,c_minor,d_flat,b_flat_minor];
	chord_prog5 = [a_minor,e_minor,f_major,g_major];
	chords_array = [chord_prog1,chord_prog2,chord_prog3,chord_prog4,chord_prog5];
	rand_chord_int = Math.floor(Math.random() * chords_array.length);
	return chords_array[rand_chord_int];
}
