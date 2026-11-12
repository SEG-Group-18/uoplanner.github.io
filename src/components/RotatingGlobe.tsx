export function RotatingGlobe() {
  return (
    <div className="globe-stage" aria-hidden="true">
      <div className="globe-orbit globe-orbit-back" />
      <div className="globe-sphere">
        <div className="globe-longitudes" />
        <span className="globe-latitude globe-latitude-top" />
        <span className="globe-latitude globe-latitude-middle" />
        <span className="globe-latitude globe-latitude-bottom" />
        <span className="globe-shine" />
      </div>
      <div className="globe-orbit globe-orbit-front" />
      <span className="globe-spark globe-spark-one" />
      <span className="globe-spark globe-spark-two" />
    </div>
  );
}
