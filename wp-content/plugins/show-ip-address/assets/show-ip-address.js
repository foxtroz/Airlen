(function () {
  'use strict';

  function loadVisitorDetails() {
    var elements = document.querySelectorAll('[data-show-ip-field]');
    if (!elements.length || !window.ShowIPAddress || !window.ShowIPAddress.endpoint) {
      return;
    }

    var fields = Array.from(new Set(Array.prototype.map.call(elements, function (element) {
      return element.getAttribute('data-show-ip-field');
    })));
    var endpoint = new URL(window.ShowIPAddress.endpoint, window.location.href);
    fields.forEach(function (field) {
      endpoint.searchParams.append('fields[]', field);
    });

    fetch(endpoint.toString(), {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Visitor details request failed');
        }
        return response.json();
      })
      .then(function (data) {
        elements.forEach(function (element) {
          var field = element.getAttribute('data-show-ip-field');
          element.textContent = typeof data[field] === 'string'
            ? data[field]
            : window.ShowIPAddress.unavailable;
        });
      })
      .catch(function () {
        elements.forEach(function (element) {
          element.textContent = window.ShowIPAddress.unavailable;
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVisitorDetails);
  } else {
    loadVisitorDetails();
  }
}());
