import styled from "styled-components";

export const FormSC = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
  @media (max-width: 1000px) {
    width: 440px;
    margin: auto;
    justify-content: center;
  }
`;

export const ParamBase = styled.div`
  width: auto;
  margin: 10px;
  select {
    margin-left: 3px;
    padding: 3px;
  }
  input {
    margin-left: 3px;
    padding: 3px;
  }
  h5 {
    margin: 0 0 0 3px;
  }
`;

export const EquipmentSC = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1000px) {
    width: 30%;
    flex-wrap: wrap;
    margin-left: auto;
    justify-content: center;
  }
`;

export const CameraSC = styled(ParamBase)``;

export const RoverSC = styled(ParamBase)`
  margin-right: 18px;
`;

export const DatesSC = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1000px) {
    width: 40%;
    flex-wrap: wrap;
    justify-content: left;
  }
`;

export const SolSC = styled(ParamBase)``;
export const EarthDateSC = styled(ParamBase)`
  input {
    @media (max-width: 1000px) {
      margin-bottom: 3px;
    }
  }
`;