---
title: 'Word Counter App'
time: '5'
uploaded_at: 'March 2 2023'
cover_image: 'https://raw.githubusercontent.com/K-logeshwaran/blogImages/main/wordCounter.png'
caption: 'Word counter is a useful tool to know the number of words, characters, and other related statistics in a given text. In this tutorial, we will build a simple word counter app using JavaScript....'
catagory : 'tech web js'
meta_desc : 'Building a Word Counter App with JavaScript'
meta_keywords : 'word counter, character counter, text analyzer, word count tool, online word counter, character count, text analysis, text statistics, word frequency, logesh, yourdevloki, yourDevLoki'
---
# Building a Word Counter App with JavaScript

Word counter is a useful tool to know the number of words, characters, and other related statistics in a given text. In this tutorial, we will build a simple word counter app using JavaScript that counts the number of words, characters, vowels, and capital letters in a given text.

## Source Code

The app is built using HTML, CSS, and JavaScript. The HTML file contains the layout of the UI, the CSS file contains the styling for the UI, and the JavaScript file contains the logic for calculating the word count, letter count, capital letter count, small letter count, and vowel count.

The JavaScript code consists of a Counter class that takes an input of words and calculates the word count, letter count, capital letter count, small letter count, and vowel count. The **isCaps(), isSmall(), and isVowels()** functions are used to count the respective values, and the execute() function runs these functions to calculate the final results.

The text area's input is tracked using an oninput event listener, which updates the result section with the current counts on every input.

## HTML Markup

We will start by creating the basic HTML markup for our word counter app. We will create a textarea where the user can input the text to be counted and some placeholder elements to display the count of different statistics.


```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Counter</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Word Counter App</h1>
    <textarea
    placeholder="Enter Your text here............." id="text" cols="30" rows="10"></textarea>
    <div class="results">
        <h3>Words: <span id="word">0</span></h3>
        <h3>letter/Charactres: <span id="letter">0</span></h3>
        <h3>Capital Letters: <span id="caps">0</span></h3>
        <h3>Small Letters: <span id="small">0</span></h3>
        <h3>Vowles: <span id="vowles">0</span></h3>
    </div>
    <script src="./script.js"></script>
</body>
</html>
```


## CSS
The CSS code defines the styling of the web page. Here's the code:

```css
h1 {
    text-align: center;
}

textarea {
    width: 100%;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    margin-bottom: 20px;
}

.results {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h3 {
    margin: 0;
}

span {
    font-weight: bold;
}

```
## JavaScript
The JavaScript code is responsible for counting the words, letters/characters, capital letters, small letters, and vowels in the inputted text. Here's the code:

```js
const text = document.getElementById("text")

const CAPS = document.getElementById("caps")
const SMALL = document.getElementById("small")
const VOWEL = document.getElementById("vowles")
const WORDS = document.getElementById("word")
const LETTER = document.getElementById("letter")

console.log(text);
let f = "vsd mdjsvnvsd vjsdi"
text.oninput=e=>{
    let val = e.target.value
    let Words = val.split(" ")
    console.log(Words);
    const COUNTER = new Counter(Words)
    let result=COUNTER.execute()
    console.log(result);
    [caps,small ,vowel,words,letter] =result

    CAPS.textContent = caps
    SMALL.textContent = small
    VOWEL.textContent = vowel
    LETTER.textContent = letter
    WORDS.textContent = words
    console.log(words);
};


class Counter{
    constructor(input){
        this.input = input
        this.caps = 0
        this.small = 0
        this.vowel = 0
        //this.space = 0
        this.letter =0
        this.words =0
    }
    isCaps(char){
        if( char === " ") return 
        if(char.toUpperCase()===char){
            this.caps+=1
        }
    }
    isSmall(char){
        if(char.toLowerCase()===char){
            this.small+=1
        }
    }
    isVowles(char){
        let vowels = 'aeiouAEIOU'
        if (vowels.includes(char)===true){
            this.vowel+=1
        }
    }
    execute(){
        console.log(this.words);
       for(let i of this.input){
        for(let j of i){
            this.isSmall(j)
            this.isVowles(j)
            this.isCaps(j)
            this.letter+=1
        }
        if(i.length != 1 && i != '' ){
            this.words+=1
        }
       }
        console.log(this.words);
        console.log(this.letter);
        console.log(  this.caps,
            this.small ,
            this.vowel,
            this.space );
        return [this.caps,this.small ,this.vowel,this.words,this.letter]
    }
}
```

## Code Analysis

First, the code gets the HTML elements by their IDs using document.getElementById() and assigns them to corresponding variables. The text variable refers to the text input element.

Next, an event listener is added to the text element, which listens for changes in the input value. Once the input value changes, the function inside the event listener is executed. The input value is extracted and split into an array of words using the split() method.

Then, a Counter class is defined with a constructor that initializes the properties of the class with the input parameters. The Counter class has several methods such as isCaps(), isSmall(), isVowels(), and execute().

The isCaps() method checks if the character passed as an argument is a capital letter or not, and increments the caps property of the class object accordingly. The isSmall() method does the same for small letters, and the isVowels() method checks if the character passed as an argument is a vowel and increments the vowels property accordingly.

The execute() method is called when the counting operation needs to be performed. This method uses nested loops to iterate over the words and letters of the input text. The isCaps(), isSmall(), and isVowels() methods are called for each letter encountered, and the properties of the class object are incremented accordingly.

Additionally, the execute() method counts the number of words in the input text and stores it in the words property of the class object. It also counts the number of letters in the input text, including spaces, and stores it in the letter property.

Finally, the execute() method returns an array containing the values of the caps, small, vowel, words, and letter properties. These values are then used to update the text content of the HTML elements on the webpage.

Overall, this program provides a simple and effective way of counting different properties of text inputs.

## Conclusion

The Word Counter App is a simple yet useful tool that helps users quickly calculate the word count, letter count, capital letter count, small letter count, and vowel count of a block of text. Its intuitive UI and well-written code make it easy to use and modify for personal or professional use.