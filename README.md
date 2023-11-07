<h1 align="center">MemoApp</h1>
<h3>What has been implemented:</h3>
<ul style="">
    <li>responsive design for mobile/tablet/desktop devices</li>
    <li>switch dark/light theme cklicking button</li>
    <li>minimalistic design with clear and user-friendly functionality</li>
    <li><code><b>noscript</b></code> tag activates when javascript is disabled on your browser and display the message</li>
    <li>when you click on <code><b>+ADD MEMO</b></code> button the function <code>onAddItemSubmit</code> is called and new app elements are created when using JS DOM manipulation <code>createElement</code> and <code>appendСhild</code></li>
    <li>can't add an empty <b>memo</b> by clicking the <code>+ADD ITEM</code> button when <code>input</code> is empty or filled with <code>Spacebar</code></li>
    <li>using the <code>filterItems</code> function, an input <code>filter</code> has been implemented to search for added memos</li>
    <li>new memos are added to the DOM and <code>localStorage</code> of the browser. Using the <code>getItemsFromStorage</code> function, we check whether the items have already been added to  <code>localStorage</code> and if there is nothing there, add them</li>
    <li>each <b>memo</b> has a tarsh can icon for removing it from the memo list. When clicking on the icon, a modal window pops up to confirm the deletion</li>
    <li>using the function <code>setItemToEdit</code>, the editing mode is called when clicking on the memo and the <code>UPDATE MEMO</code> button is displayed instead of the <code>+ADD MEMO</code> button. After clicking on the <code>UPDATE MEMO</code> button, the memo is set to the top of the list</li>
    <li>clicking on the <code>CLEAR ALL</code> button removes all memos from the <code>DOM</code> and <code>localStorage</code> when the function <code>clearAllItems</code> is called</li>
    <li>click here to try => <a href="https://bakna2t.github.io/memoapp/" style="font-weight: bold;" target="_blank">MemoApp</a></li>
</ul>
<hr>
<a href="https://bakna2t.github.io/memoapp/"><img style="border-radius: 20px;" alt="MemoApp" src ="./images/baner_memo.png" target="_blank"/></a>
