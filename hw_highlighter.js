let font_size = 24
let DISABLE_PRINT = true
let DAY_LOOK_AHEAD = 4

function print(text) {
	if (!DISABLE_PRINT) {
		$('body').prepend('<div style="padding: 20px; font-size: ' + font_size + 'px; background-color: black; color: green;">' + text + '</div>')
	}
}

function getAssignment(idx) {
    return $('.d2l-table-cell-last').get(idx)
}

// query all assignments on the page
function getAssignments() {
    print('getting assignments')
    
    let assignments = [] 
    $('.d2l-table-cell-last').each((index)=>{
        try { // TODO remove this try catch once verified
            let str = getAssignment(index).innerText
            if (!Number.isNaN(Date.parse(str))) {
                assignments.push(index)
            }
        } catch(e) {
            print('failed to convert date')
        }
    })
    return assignments
}

function inRange(date, nDays) {
    let oneDay = 24 * 60 * 60 * 1000;
    let today = new Date()
    let dayDiff = (date - today) / oneDay
    return dayDiff <= nDays && dayDiff >= 0;
}


let counter = 10 // draw this many times
let delay = 200 // with a delay of this much
function draw() {
	let assignments = getAssignments()

    for (idx in assignments) {
        let assignment = getAssignment(idx)
        let dueDate = Date.parse(assignment.innerText)
        if (inRange(dueDate, DAY_LOOK_AHEAD)) {
	    	$(assignment).parent().css({
			    "background-color": "#ddeedd",
	    	})
        }
    }
    
    // draw repeatedly
    if (counter > 0) {
        counter--
        setTimeout(draw, delay)
    }
}

draw()
print("page loaded")

