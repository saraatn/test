function createInfoHotspotElement(hotspot) {
    // 1. Create the main hotspot container wrapper
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    // 2. Create the icon wrapper and embed the icon image
    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');
    var icon = document.createElement('img');
    
    // Change this to 'img/youtube.png' later if you add a youtube icon asset!
    icon.src = 'img/info.png'; 
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);
    wrapper.appendChild(iconWrapper);

    // 3. HIJACK CLICK EVENT: Open our custom unified video widget instead of the default text popover
    iconWrapper.addEventListener('click', function() {
      var modal = document.getElementById('video-modal');
      var modalTitle = document.querySelector('#video-modal h2');
      var modalText = document.querySelector('#video-modal p');
      var modalIframe = document.getElementById('youtube-player');

      if (modal) {
        // Dynamically inject the data from data.js into our widget elements
        if (modalTitle) modalTitle.innerHTML = hotspot.title;
        if (modalText) modalText.innerHTML = hotspot.text;
        
        // Update the YouTube video source if a unique video ID is specified in data.js
        if (modalIframe && hotspot.video) {
          modalIframe.src = "https://www.youtube.com/embed/" + hotspot.video + "?enablejsapi=1&autoplay=1";
        } else if (modalIframe) {
          // Fallback placeholder video if you forgot to specify a video ID for a station
          modalIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&autoplay=1";
        }

        // Reveal our beautiful layout
        modal.style.display = 'flex';
      }
    });

    // Stop Marzipano from treating clicks on the icon as map-dragging controls
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }
