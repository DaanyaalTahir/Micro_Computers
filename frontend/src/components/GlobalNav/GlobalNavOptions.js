import {
  Pc,
  Fan,
  Gear,
  KeyboardFill,
  Headphones,
  BagFill,
} from "react-bootstrap-icons";

export const nav_options = [
  {
    id: "gamingPc",
    title: "Gaming PCs",
    subheadings: [
      {
        name: "Prebuilt PCs",
        icon: <Pc />,
        values: [
          { title: "Foundation PC", description: "Prebuilt Gaming PC" },
          { title: "Creator PC", description: "Prebuilt Gaming PC" },
          { title: "H1 Mini PC", description: "Prebuilt Mini ITX" },
        ],
      },
    ],
  },
  {
    id: "components",
    title: "Components",
    subheadings: [
      {
        name: "Cases",
        icon: <Pc />,
        values: [
          { title: "H710", description: "Mid-Tower" },
          { title: "H510", description: "Mid-Tower" },
          { title: "H210", description: "Mini-ITX" },
          { title: "H1", description: "Small Form Factor Mini-ITX" },
          { title: "CRFT", description: "Limited Edition" },
        ],
      },
      {
        name: "Cooling",
        icon: <Fan />,
        values: [
          {
            title: "Kraken Z",
            description: "AIO Liquid Cooler with LCD Display",
          },
          {
            title: "Kraken X",
            description: "AIO Liquid Cooler with Infinity Mirror Display",
          },
          {
            title: "Kraken 120",
            description: "AIO Liquid Cooler with Infinity Mirror Display",
          },
          {
            title: "AER",
            description: "High Performance and RGB Fans",
          },
        ],
      },
      {
        name: "Components",
        icon: <Gear />,
        values: [
          { title: "Motherboards", description: "Gaming Motherboard" },
          { title: "Power", description: "80 Plus Rated PSUs" },
          {
            title: "Lighting",
            description: "Expanded RGB Lighting and Control",
          },
        ],
      },
    ],
  },
  {
    id: "peripherals",
    title: "Peripherals",
    subheadings: [
      {
        name: "Keyboard & Mouse",
        icon: <KeyboardFill />,
        values: [
          { title: "Keyboard", description: "Modular Mechanical Keyboard" },
          { title: "Mouse", description: "Lightweight Mouse" },
        ],
      },
      {
        name: "Audio",
        icon: <Headphones />,
        values: [
          { title: "Microphone", description: "" },
          { title: "Heahset", description: "" },
        ],
      },
    ],
  },
];
