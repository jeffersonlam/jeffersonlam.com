function createEmailAnchor(element, array) {
  const email = array.join('');
  element.href = 'mailto:' + email + '?subject=Reaching Out';
  element.innerHTML = email;
}

createEmailAnchor(email, ['jefferson','w','lam','@','gmail','.','com']);
