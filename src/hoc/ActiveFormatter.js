import React from "react";

const ActiveFormatter = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const activeFormatter = (cell, row, rowIndex) => {
        const icon =
          cell === true ? (
            <i className="material-icons text-center text-success">
              check_circle_outline
            </i>
          ) : (
            <i className="material-icons text-warning">highlight_off</i>
          );

        return <div className="text-center">{icon}</div>;
      };

      return (
        <WrappedComponent activeFormatter={activeFormatter} {...this.props} />
      );
    }
  }

  return HOC;
};

export default ActiveFormatter;
