export default function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.13),transparent_26rem),radial-gradient(circle_at_12%_55%,rgba(120,120,120,0.18),transparent_28rem),linear-gradient(180deg,#000_0%,#060606_42%,#000_100%)]" />
      <div className="ambient-orb-a absolute -left-32 top-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="ambient-orb-b absolute right-[-10rem] top-32 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
      <div className="ambient-orb-c absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-white/7 blur-3xl" />
      <div className="absolute inset-y-0 left-[8%] w-px bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.22)]" />
      <div className="absolute inset-y-0 right-[9%] w-px bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.22)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="noise-layer absolute inset-0 opacity-[0.18]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.46)_68%,rgba(0,0,0,0.88)_100%)]" />
    </div>
  );
}
