export default function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-echo-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(139,169,147,0.05),transparent_26rem),radial-gradient(circle_at_12%_55%,rgba(45,90,71,0.08),transparent_28rem),linear-gradient(180deg,#1a3a2a_0%,#1a3a2a_42%,#1a3a2a_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,169,147,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,169,147,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_88%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_68%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
