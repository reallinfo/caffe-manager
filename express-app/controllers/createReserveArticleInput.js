
// Create reserve article input in order list when page loads
module.exports.createInput = function(){

  const selectedForm = document.getElementById('currentOrderForm');

  // Form element
  const form = document.createElement("form");
  form.setAttribute('action', '/admin/order/reserve-article');
  form.setAttribute('method', 'post');
  form.className = 'articleInputForm';

  // Input element
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'reservedArticleName');
  input.setAttribute('placeholder', 'Choose article');
  input.className = 'reservedArticleInput'
  input.id = 'reservedArticleId';

  // Create div
  const div = document.createElement('div');
  div.className = 'reservedArticleDiv collection-item';
  div.id = 'reservedArticleDiv';
  // Create article image
  const img = document.createElement('img');
  img.className = 'reserveArticleImg';
  // Create X
  const p = document.createElement('p');
  p.className = 'timesSign';
  const txt = 'X';
  const xSign = document.createTextNode(txt);
  p.appendChild(xSign);
  // Create quantity field
  let qtyInput = document.createElement('input');
  qtyInput.setAttribute('type', 'number');
  qtyInput.setAttribute('value', '0');
  qtyInput.setAttribute('name', 'reservedArticleQuantity');
  qtyInput.className = 'qtyInput';

  // Cancel Button
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'cancelArticleBtn';
  cancelBtn.id = 'cancelArticleBtn';
  const cancelBtnTxt = 'x';
  const cancelBtnTxtNode = document.createTextNode(cancelBtnTxt);
  cancelBtn.appendChild(cancelBtnTxtNode);
  cancelBtn.setAttribute('type', 'button');
  cancelBtn.setAttribute('onclick', 'cancelArticleInput()');

  // Submit Button
  let submitBtn = document.createElement('button');
  submitBtn.className = 'submitArticleBtn';
  submitBtn.id = 'submitArticleBtn';
  let submitBtnTxt = 'Ok';
  let submitBtnTxtNode = document.createTextNode(submitBtnTxt);
  submitBtn.appendChild(submitBtnTxtNode);
  submitBtn.setAttribute('type', 'submit');

  form.appendChild(input);
  form.appendChild(p);
  form.appendChild(qtyInput);
  form.appendChild(cancelBtn);
  form.appendChild(submitBtn);
  div.appendChild(img);
  div.appendChild(form);
  selectedForm.appendChild(div);
};
