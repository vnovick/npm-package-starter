import RedBox from 'redbox-react';

export function redBoxComponent(Component) {
  try {
    return (Component);
  } catch (e) {
    return (
      <RedBox error={ e } />
    );
  }
}
