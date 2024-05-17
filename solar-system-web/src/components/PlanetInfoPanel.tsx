export function PlanetInfoPanel(props) {
  return (
    <>
      <div className="planetInfoPanel">
        {props.planetInfo && (
          <>
            <h1>{props.planetInfo.name}</h1>
            <p>{props.planetInfo.resume}</p>
          </>
        )}
      </div>
    </>
  )
}