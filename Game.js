let stack = [];
let cards_flipped = 0, correct = 0;
let vals = [];
var col = document.querySelector('.columns');
let [sec, min, hour] = [0, 0, 0];
let displayTime = document.getElementById('display-time');
let timer = null;
let nums = [];

document.addEventListener("DOMContentLoaded", function () {
    var o = document.createElement('option');
    o.text = '----';
    o.value = -1;
    col.add(o);

    for(let i=1; i<=4; i++)
    {
        var option = document.createElement('option');
        option.text = 2*i;
        option.value = 2*i;
        col.add(option);
    }
});

function Start() {
    if (col.value == -1)
        alert('Please choose a value for row and columns'); 
    else {
        let c = col.value;
        vals = [];
        stack = [];
        nums = [];
        correct = 0;
        cards_flipped = 0;
        for(let i=0; i<c; i++)
        {
            let arr = [];
            for(let j=0; j<c; j++)
                arr.push(0);
            vals.push(arr);
        }
        var container = document.querySelector('.container');
        container.innerHTML = '';
        var x = c * c / 2;
        for(let i=0; i<x; i++)
        {
            let x1, x2, y1, y2, q;
            do {
                x1 = Math.floor(Math.random() * c);
                y1 = Math.floor(Math.random() * c);
            }
            while(vals[x1][y1] != 0);
            do {
                x2 = Math.floor(Math.random() * c);
                y2 = Math.floor(Math.random() * c);
            }
            while (vals[x2][y2] != 0 || (x1 == x2 && y1 == y2));
            do {
                q = Math.floor(Math.random() * x) + 1;
            }
            while(nums.includes(q));
            nums.push(q);
            vals[x1][y1] = q;
            vals[x2][y2] = q;
        }
        console.log(vals);
        createBoard(c, c);
    }
}

function createBoard(rows, columns) {
    stack = [];
    cards_flipped = 0;
    let container = document.querySelector(".container");
    for (let c = 0; c < columns; c++) {
        var column = document.createElement('div');
        column.style.width = (100/columns) + '%';
        column.className = "column";
        for (let i = 0; i < rows; i++) {
            var holder = document.createElement("div");
            holder.className = "holder";
            holder.setAttribute('id', "Card" + i + '' + c);
            holder.addEventListener('click', () => flip(i+''+c));
            var card = document.createElement("div");
            card.className = "card";
            var front = document.createElement("div");
            var back = document.createElement("div");
            front.className = "front";
            back.className = "back";
            back.textContent = vals[i][c];
            back.style.backgroundimage = "url('https://source.unsplash.com/random/739x133')";
            card.appendChild(front);
            card.appendChild(back);
            holder.appendChild(card);
            column.appendChild(holder);
        }
        container.appendChild(column);
    }
    const q = document.getElementById('Card00');
    let fontSize = Math.min(q.clientHeight, q.clientWidth) * 0.8;
    container.style.fontSize = fontSize+'px';
    console.log(fontSize);
    [sec, min, hour] = [0, 0, 0];
    displayTime.innerHTML = '00 : 00 : 00';
    watchStart();
}

function flip(n) {
    if (cards_flipped == 2)
        return;
    const holder = document.getElementById('Card' + n);
    holder.classList.toggle('flipped');
    cards_flipped++;
    stack.push(holder);
    if (cards_flipped == 2) {
        const c1 = stack.pop();
        const c2 = stack.pop();
        if(c1.textContent != c2.textContent)
            setTimeout(function() {
                c1.classList.toggle('flipped');
                c2.classList.toggle('flipped');
            }, 1000);
        else
            correct += 2;
        cards_flipped = 0;
    }
    if(correct == col.value * col.value)
    {
        setTimeout(function() {
            createPopup();
        }, 1000);
    }
}

function createPopup() {
    clearInterval(timer);
    var popup = document.createElement('div');
    popup.className = 'popup';
    var link = document.createElement('a');
    link.setAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    link.setAttribute('target', '_blank');
    link.textContent = 'Winner';
    popup.appendChild(link);

    var button = document.createElement('button');
    button.className = 'close-button';
    button.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
    popup.appendChild(button);

    let h = hour < 10 ? '0' + hour : hour;
    let m = min < 10 ? '0' + min : min;
    let s = sec < 10 ? '0' + sec : sec;
    var time = document.createElement('label');
    time.textContent = 'Time taken: '+h+' : '+m+' : '+s;
    popup.append(time);

    document.body.appendChild(popup);
}

function watchStart() {
    if(timer != null)
        clearInterval(timer);
    timer = setInterval(stopwatch, 1000);
}

function stopwatch() {
    sec++;
    if(sec == 60)
    {
        sec = 0;
        min++;
        if(min == 60)
        {
            min = 0;
            hour++;
        }
    }

    let h = hour < 10 ? '0' + hour : hour;
    let m = min < 10 ? '0' + min : min;
    let s = sec < 10 ? '0' + sec : sec;
    displayTime.innerHTML = h + ' : ' + m + ' : ' + s;
}
