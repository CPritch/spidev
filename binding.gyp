{
  "targets": [
    {
      "target_name": "spidev",
      "sources":[ "src/spidev.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}