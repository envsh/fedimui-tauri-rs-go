<script setup lang="ts" >


let items =    [
      { title: 'Click Me1' },
      { title: 'Click Me2' },
      { title: 'Click Me3' },
      { title: 'Click Me4' },
    ];

</script>

<template>

      <v-menu>
        <template >
          <v-tooltip location="top">
            <template >
              <v-btn
                color="primary"
              >
                Dropdown w Tooltip
              </v-btn>
            </template>
            <span>I'm A Tooltip</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

  </template>
