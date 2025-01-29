export class Particle {
  public radius: number = 2; // Standardradius
  public ax: number = 0; // Beschleunigung x
  public ay: number = 0.1; // Beschleunigung y (z. B. Schwerkraft)

  constructor(
    public x: number,
    public y: number,
    public vx: number,
    public vy: number,
    public color: string,
    public lifetime: number,
    radius?: number // Optionaler Radius
  ) {
    if (radius !== undefined) this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.lifetime > 0 ? this.lifetime / 100 : 0; // Verblassen
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1; // Zurücksetzen
  }

  update() {
    if (this.lifetime > 0) {
      this.vx += this.ax;
      this.vy += this.ay;
      this.x += this.vx;
      this.y += this.vy;
      this.lifetime -= 1;
    }
  }
}
