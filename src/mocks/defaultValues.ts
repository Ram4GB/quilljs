const defaultValues = {
  ops: [
    {
      insert: {
        "styled-image": {
          alt: "logo",
          url: "https://res.cloudinary.com/dluupfg6f/image/upload/v1721113284/rvouujgecxqh1rppxfw7.png",
          width: "100",
          height: "100",
          align: "center",
        },
      },
    },
    {
      insert: "\n",
    },
    {
      insert: "WELCOME TO WONDERFOODS",
      attributes: {
        bold: true,
      },
    },
    {
      insert: "\n",
      attributes: {
        align: "center",
        header: 1,
      },
    },
    {
      insert: "\n",
      attributes: {
        align: "center",
      },
    },
    {
      insert: "Dear ",
    },
    {
      insert: {
        "styled-mention": {
          index: "0",
          denotationChar: "@",
          id: "515fd775-cb54-41f3-b921-56163871e2cf",
          value: "{{parent_name}}",
        },
      },
    },
    {
      insert: "\nWe are delighted to welcome you and your family to our community!\n\nMy name is ",
    },
    {
      insert: {
        "styled-mention": {
          index: "1",
          denotationChar: "@",
          id: "711f68ab-ca20-4011-ab0f-d98c8fac4c05",
          value: "{{user_name}}",
        },
      },
    },
    {
      insert:
        ", and I will be your primary point of contact. I am\nhere to assist you with any questions or concerns you may have as you get\nacquainted with our programs and services.\n\nI would like to extend a special welcome to ",
    },
    {
      insert: {
        "styled-mention": {
          index: "2",
          denotationChar: "@",
          id: "775e05fc-72bc-48a1-9508-5c61674734f1",
          value: "{{child_name}}",
        },
      },
    },
    {
      insert:
        ". We are excited\nto have them join us and look forward to seeing them thrive in our environment.\n\nIf there is anything you need or if you have any questions, please do not hesitate\nto reach out to me directly.\n\nThank you for choosing us. We are thrilled to have you as part of our community!\n\n",
    },
    {
      insert: {
        "styled-image": {
          alt: "logo",
          url: "https://res.cloudinary.com/dluupfg6f/image/upload/v1721113301/ge4n5biqskcsaimpfqmv.png",
          width: "50",
          height: "50",
          align: "left",
        },
      },
    },
    {
      insert: "\n\n\n\nBest regards,\n",
    },
  ],
};

export default defaultValues;
