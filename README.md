# Javascript Simple Transfer

Transfer element to element with animation without jQuery and jQuery UI. Very small size and very simple to use

## Usage

![Image transfer](https://img.techpowerup.org/200605/image-transfer.gif)
### Sample code
```html
<div style="width: 650px; position: relative; margin: auto">
    <h2>JavaScript Simple Transfer</h2>
    <button type="button" id="button" style="margin: 15px 0">Transfer</button>
    <img id="img" src="https://www.w3schools.com/tags/img_girl.jpg" alt="" style="display: block" width="180"/>
    <div id="div2" style="width: 55px; height: 55px; background-color: blue; position: absolute; left: 90%; top: 50%"></div>
</div>
<script src="../src/simple-transfer.min.js"></script>
<script>

    document.getElementById('button').addEventListener('click', function () {
        new SimpleTransfer({
            from: '#img',
            to: '#div2',
            transferCss: {
                border: '4px solid #ddd',
            },
            /**
             * clone: true,
             * opacity: .45,
             */
            start: function () { // optional
                console.log(this); // this === transfer element
            },
            end: function () { // optional
                console.log('Ended.');
            },
        });
    });

</script>
```