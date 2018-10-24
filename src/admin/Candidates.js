import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Table, Icon, Button, Tag} from "antd";
import {Link} from "react-router-dom";

import {authen} from "../utils/authen";
import {fetchWithToken} from "../utils/fetch";

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`;

const columns = [
  {
    title: "Name",
    key: "name",
    render: user => (
      <span>
        {user.firstNameEN} {user.lastNameEN} ({user.nickname})
      </span>
    ),
    fixed: "left",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: status => (
      <span>
        <Tag color={status === "completed" ? "green" : "volcano"}>{status}</Tag>
      </span>
    ),
  },
  {
    title: "Major",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "Birthdate",
    dataIndex: "birthdate",
    key: "birthdate",
  },
  {
    title: "YWC Staff Check Status",
    dataIndex: "isPassStaff",
    key: "isPassStaff",
    render: status => (
      <span>
        <Tag color={status === true ? "green" : "geekblue"}>
          {status === true ? "Checked" : "Don't Check"}
        </Tag>
      </span>
    ),
  },
  {
    title: "Grading Status",
    dataIndex: "failed",
    key: "failed",
    render: failed => (
      <span>
        <Tag color={failed === true ? "red" : "purple"}>
          {failed === true ? "Failed" : "In System"}
        </Tag>
      </span>
    ),
  },
  {
    title: "Committee Score",
    dataIndex: "committeeScore",
    key: "committeeScore",
    render: score => <span>{score || 0}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: data => (
      <Button>
        <Link params={{id: data.id}} to={`/candidates/${data._id}`}>
          <Icon type="edit" theme="outlined" /> ดูรายละเอียเพิ่มเติม
        </Link>
      </Button>
    ),
    width: 200,
    fixed: "right",
  },
];

const mapStateToProps = state => ({
  auth: state.auth,
});

@authen("admin")
@connect(mapStateToProps)
@observer
export default class Candidates extends Component {
  @observable
  candidates = [];

  // fetch and render data
  componentDidMount = async () => {
    this.getCandidates();
  };

  getCandidates = async () => {
    const {major} = this.props.auth.profile;
    const response = await fetchWithToken("users/all", {major}, "GET");

    if (response.status === "success") {
      this.candidates = response.payload;
    }
  };

  render() {
    return (
      <Fragment>
        <Padding>Hello world</Padding>

        <Table
          columns={columns}
          scroll={{x: 2000}}
          dataSource={this.candidates}
        />
      </Fragment>
    );
  }
}
