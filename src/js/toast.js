export default class Toast {
    constructor(btnId, modalId) {
        this.modalButton = document.getElementById(btnId);
        this.modalContainer= document.getElementById(modalId);
        this.mediaQuery = window.matchMedia("(min-width: 46.1875rem)");
        this.entranceAnimation = this.mediaQuery.matches ? 'animate:popInUp' : 'animate:fade-in';
        this.isCooldown = false;

        if(!this.modalButton || !this.modalContainer) {
            console.warn("Modal setup failed -  Please include valid arguments!");
            return;
        }

        this.initEvents();
    }

    initEvents() {
        ["mouseover", "focus", "mouseleave", "focusout"].forEach((event) =>
          this.modalButton.addEventListener(event, (e) => this.handlePause(e))
        );

        this.mediaQuery.addEventListener('change', this.updateAnimation)
    
        this.modalButton.addEventListener("click", () => {
            if (this.isCooldown) return; 

            this.isCooldown = true;
            setTimeout(() => this.isCooldown = false, 300);

            this.toggleModal()
    });
        window.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && this.modalContainer.open) this.toggleModal();
        });
      }

      toggleModal() {
        this.modalButton.classList.toggle('active');
        this.modalContainer.open ? this.closeModal() : this.openModal();
      }
    
      openModal() {
        this.modalContainer.show();
        this.modalContainer.classList.add(this.entranceAnimation);
      }
    
      closeModal() {
        if (!this.modalContainer.classList.contains(this.entranceAnimation)) return;

        this.modalButton.classList.remove('active');

        this.modalContainer.classList.replace(this.entranceAnimation, "animate:fade-out");
        setTimeout(() => {
          this.modalContainer.close();
          this.modalContainer.classList.remove("animate:fade-out");

          this.modalButton.focus();

        }, 251);
      }

      handlePause(e) {
        let target = e.currentTarget;

        if (e.type === "mouseleave" || e.type === "focusout") {
            setTimeout(() => {
                if (!this.modalContainer.open) {
                    target.classList.remove('paused');
                }
            }, 100);
        } else {
            if (!this.modalContainer.open) {
                target.classList.add('paused');
            }
        }
    }

    updateAnimation = () => {
      if(this.modalContainer.open) this.closeModal();
      this.entranceAnimation = this.mediaQuery.matches ? 'animate:popInUp' : 'animate:fade-in';
    }
}

