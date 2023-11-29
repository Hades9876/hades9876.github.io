let stack = [];
// const push = (item) => stack.push(item);
// const pop = () => stack.pop();
let cards_flipped = 0, correct = 0;
let vals = [];
var col = document.querySelector('.columns');
var row = document.querySelector('.rows');

document.addEventListener("DOMContentLoaded", function () {
    var o = document.createElement('option');
    o.text = '----';
    o.value = -1;
    col.add(o);

    var p = document.createElement('option');
    p.text = '----';
    p.value = -1;
    row.add(p);

    for(let i=1; i<=7; i++)
    {
        var option = document.createElement('option');
        option.text = i;
        option.value = i;
        col.add(option);
    }

    for(let i=1; i<5; i++)
    {
        var option = document.createElement('option');
        option.text = i;
        option.value = i;
        row.add(option);
    }
});

function Start() {
    if (row.value == -1 || col.value == -1)
        alert('Please choose a value for row and columns'); 
    else if (row.value % 2 != 0 && col.value % 2 != 0)
        alert('Not possible to create a board with these parameters');  
    else {
        let r = row.value, c = col.value;
        // let r = 2, c = 3;
        vals = [];
        stack = [];
        correct = 0;
        cards_flipped = 0;
        for(let i=0; i<r; i++)
        {
            let arr = [];
            for(let j=0; j<c; j++)
                arr.push(0);
            vals.push(arr);
        }
        var container = document.querySelector('.container');
        container.innerHTML = '';
        var x = r * c / 2;
        for(let i=0; i<x; i++)
        {
            let x1, x2, y1, y2, q;
            do {
                x1 = Math.floor(Math.random() * r);
                y1 = Math.floor(Math.random() * c);
            }
            while(vals[x1][y1] != 0);
            do {
                x2 = Math.floor(Math.random() * r);
                y2 = Math.floor(Math.random() * c);
            }
            while (vals[x2][y2] != 0 || (x1 == x2 && y1 == y2));
            do {
                q = Math.floor(Math.random() * 100) + 1;
            }
            while(vals.includes(q));
            vals[x1][y1] = q;
            vals[x2][y2] = q;
        }
        console.log(vals);
        createBoard(r, c);
    }
}

function createBoard(rows, columns) {
    stack = [];
    cards_flipped = 0;
    const container = document.querySelector(".container");
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
    if(correct == row.value * col.value)
    {
        setTimeout(function() {
            createPopup();
        }, 1000);
    }
}

function createPopup() {
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
    })
    popup.appendChild(button);

    document.body.appendChild(popup);
}