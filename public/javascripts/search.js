function compare () {    
    var recipies = [[[0], [0, 12, 13], [1]],
	 [[0, 2], [0, 7, 12], [1, 3]],
	 [[2], [0, 2], [2]],
	 [[0, 5], [12], [2]],
	 [[0], [0, 6, 12, 13], [2]],
	 [[2], [0, 2, 6, 13], [0]],
	 [[2], [0, 5, 11], [0]],
	 [[1], [], [0]],
	 [[3], [0, 13], [0]],
	 [[3], [0, 2, 13], [2]]];
    document.getElementById("slider").style.display = "none";
    var ingredients = [document.getElementsByName("meat"), document.getElementsByName("vegetable"), document.getElementsByName("carbohydrates")];
    
    for (a = 0; a < 10; a++) {
        stop = false;
        for (b = 0; b < 3; b++)
            for (c = 0; c < recipies[a][b][c].length; c++)
                if (!ingredients[b][recipies[a][b][c]].checked) {
                    stop = true;
                    break;
                }
            if (stop) break;
        if (!stop) document.getElementById(a).style.display = "block";
    }
}