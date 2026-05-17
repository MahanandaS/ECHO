export default function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-echo-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.02),transparent_26rem),radial-gradient(circle_at_12%_55%,rgba(255,255,255,0.01),transparent_28rem),linear-gradient(180deg,#0f0f0f_0%,#0f0f0f_42%,#0f0f0f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_88%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_68%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
