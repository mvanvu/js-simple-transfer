# Javascript Simple Transfer

Transfer element to element with animation without jQuery and jQuery UI. Very small size and very simple to use

## Usage
### HTML
```html
<div style="width: 650px; position: relative; margin: auto">
    <h2>JavaScript Simple Transfer</h2>
    <button type="button" id="button" style="margin: 15px 0">Transfer</button>
    <div id="div1" style="width: 155px; height: 185px; background-color: teal"></div>
    <div id="div2" style="width: 55px; height: 55px; background-color: blue; position: absolute; left: 90%; top: 50%"></div>
</div>
```

### JAVASCRIPT
```javascript
<script src="../src/simple-transfer.min.js"></script>
<script>

    document.getElementById('button').addEventListener('click', function () {
        new SimpleTransfer({
            from: '#div1',
            to: '#div2',
            transferCss: {
                border: '1px solid #eee',
                backgroundColor: 'purple',
            },
            callBack: function (from, to) {
                console.log([from, to])
            }
        });
    });

</script>
```

