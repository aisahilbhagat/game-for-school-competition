window.LoadGameScreen = {
    backBtn: { 
        x: 40, y: 40, w: 100, h: 40, label: "BACK",
        scale: 1, targetScale: 1, isHovered: false, isPressed: false
    },

    init: function() {
        console.log("LoadGame Screen initialized");
        // Reset state on init
        this.backBtn.scale = 1;
        this.backBtn.targetScale = 1;
        this.backBtn.isHovered = false;
        this.backBtn.isPressed = false;
    },

    getMousePos: function(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    },

    handleMouseMove: function(e, canvas) {
        const pos = this.getMousePos(e, canvas);
        const b = this.backBtn;
        
        if (pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h) {
            b.isHovered = true;
            b.targetScale = b.isPressed ? 0.95 : 1.1;
            document.body.style.cursor = 'pointer';
        } else {
            b.isHovered = false;
            b.targetScale = 1.0;
            b.isPressed = false;
            document.body.style.cursor = 'default';
        }
    },

    handleMouseDown: function(e, canvas) {
        const pos = this.getMousePos(e, canvas);
        const b = this.backBtn;
        
        if (pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h) {
            b.isPressed = true;
            b.targetScale = 0.95;
        }
    },

    handleMouseUp: function(e) {
        const b = this.backBtn;
        if (b.isPressed) {
            b.isPressed = false;
            b.targetScale = b.isHovered ? 1.1 : 1.0;
            
            // Only trigger action if we are still hovering over the button
            if (b.isHovered) {
                if(window.GameMenu) window.GameMenu.closeSubScreen();
            }
        }
    },

    render: function(ctx, canvas) {
        // Full screen cover
        ctx.fillStyle = "#121212";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 40px monospace";
        ctx.fillText("LOAD SAVED GAME", canvas.width / 2, 100);

        // Placeholder Content
        ctx.fillStyle = "#444";
        ctx.font = "20px monospace";
        ctx.fillText("No save files found.", canvas.width / 2, canvas.height / 2);

        // --- ANIMATED BACK BUTTON ---
        const b = this.backBtn;
        
        // 1. Animation Math
        b.scale += (b.targetScale - b.scale) * 0.2;

        ctx.save();
        // 2. Translate to center of button to scale from center
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        ctx.translate(cx, cy);
        ctx.scale(b.scale, b.scale);
        
        // 3. Draw relative to (0,0) being the center
        const drawX = -b.w / 2;
        const drawY = -b.h / 2;

        ctx.fillStyle = "#333";
        ctx.fillRect(drawX, drawY, b.w, b.h);
        ctx.strokeStyle = "#777";
        ctx.strokeRect(drawX, drawY, b.w, b.h);
        
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, 0, 0); // Text at center (0,0)

        ctx.restore();
    }
};