{
  "spider_name": "unified-us-tx-ssb-enforcement-actions",
  "api_table": "legal_api_docs",
  "meta_table": "enforcements",
  "jurisdiction": "US-TX",
  "agency": "Texas State Securities Board-Enforcement Actions Administrative",
  "agency_id": 300002,
  "short_name": "TX-SSB",
  "base_url": "https://www.ssb.texas.gov/",
  "content_url": "https://www.ssb.texas.gov/news-publications/enforcement-actions-administrative",
  "specification": "https://docs.google.com/document/d/1_HLf59QBhUfliSxwqgPx6XXHI8QFoRC5UQkLwq4I9Po/edit",
  "configurations": {
      "category_conversion": [
          {
              "category_approach": "containing",
              "conversion_map": {
                  "Cease and Desist": "Cease and Desist",
                  "Consent Order": "Consent Order",
                  "Agreed Order": "Consent Order",
                  "Suspended": "Suspended Order",
                  "Revocation": "Revocation Order",
                  "Fine": "Civil Money Penalty"
              },
              "default_category": "Enforcement Order"
          }
      ],
      "steps": {
          "start": {
              "description": "Starting step that loads main web-page.",
              "save_document": false,
              "process_related_documents": false,
              "is_parent": false,
              "continue_crawl": false,
              "next_step": [
                  "articles_step",
                  "articles_step_notice",
                  ">> next_page"
              ]
          },
          "articles_step": {
              "description": "filter articles to only process articles with docket id in title",
              "save_document": false,
              "process_related_documents": false,
              "is_parent": false,
              "continue_crawl": false,
              "context": {
                  "is_url": false,
                  "is_text": false,
                  "is_single": false,
                  "is_sibling_tag": false,
                  "combine_context": false,
                  "is_page_source": false,
                  "path": [
                      "div.view-content > div"
                  ],
                  "tag_filter": "[tag for tag in results if 'Notice of hearing' not in tag.text]"
              },
              "next_step": [
                  "items_step"
              ]
          },

          "items_step": {
              "description": "getting docket id from title and respondent from summary",
              "save_document": true,
              "doc": {
                  "title": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-body.news-teaser > h4 > a > span"
                      ]
                  },
                  "custom_unified_docket_id": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-body.news-teaser > h4 > a > span"
                      ],
                      "regex": "(?<=Order No. )"
                  },
                  "session_year": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-date.left"
                      ],
                      "regex": [
                          "19\\d{2}",
                          "20\\d{2}"
                      ]
                  },
                  "pub_date": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": true,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-date.left",
                      ],
                      "code_filter": "[r.replace('\n', ' ') for r in results]"
                  },

                  "title_prefix": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-date.left"
                      ]
                  },
                  "title_separator": "--",
                  "pdf_url": {
                      "is_text": false,
                      "is_url": true,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-body.news-teaser > h4 > a"
                      ]
                  },
                  "scraped_category": {
                      "path": "div.news-body.news-teaser > div",
                      "is_text": true
                  },
                  "category": "conversion",
                  "effective_date": {
                      "path": "div.view-content > div",
                      "is_text": true
                  },
                  "summary_text": {
                      "is_text": true,
                      "is_single": true,
                      "path": [
                          "div.news-body.news-teaser > div"
                      ]
                  },
                  "respondent": {
                      "is_text": true,
                      "is_single": true,
                      "path": [
                          "div.news-body.news-teaser > div"
                      ],
                      "regex": "In the Matter of (.*?):"
                  },
                  "incomplete_pub_date": true
              },
              "parent_context": "articles_step"
          },

          "articles_step_notice": {
              "description": "filter articles to only process articles with notice of hearing in title",
              "save_document": false,
              "process_related_documents": false,
              "is_parent": false,
              "continue_crawl": false,
              "context": {
                  "is_url": false,
                  "is_text": false,
                  "is_single": false,
                  "is_sibling_tag": false,
                  "combine_context": false,
                  "is_page_source": false,
                  "path": [
                      "div.view-content > div"
                  ],
                  "tag_filter": "[tag for tag in results if 'Notice of hearing' in tag.text]"
              },
              "next_step": [
                  "items_step_notice"
              ]
          },
          "items_step_notice": {
              "description": "getting respondent from title and docket_id from pdf",
              "save_document": false,
              "context": {
                  "path": [
                      "div.views-row"
                  ]
              },
              "doc": {
                  "title": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-body.news-teaser > h4 > a > span"
                      ]
                  },
                  "respondent": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-body.news-teaser > h4 > a > span"
                      ],
                      "regex": "In the Matter of (.*?):"
                  },
                  "session_year": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-date.left"
                      ],
                      "regex": [
                          "19\\d{2}",
                          "20\\d{2}"
                      ]
                  },
                  "pub_date": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": true,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-date.left"
                      ]
                  },
                  "title_prefix": {
                      "is_text": true,
                      "is_url": false,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-date.left"
                      ]
                  },
                  "title_separator": "--",
                  "pdf_url": {
                      "is_text": false,
                      "is_url": true,
                      "is_single": true,
                      "is_sibling_tag": false,
                      "is_sibling_text": false,
                      "is_date": false,
                      "dayfirst": false,
                      "parse_pdf": false,
                      "from_url": false,
                      "is_current_url": false,
                      "path": [
                          "div.news-body.news-teaser > h4 > a"
                      ]
                  },
                  "scraped_category": {
                      "path": "div.news-body.news-teaser > div",
                      "is_text": true
                  },
                  "category": "conversion",
                  "effective_date": {
                      "path": "div.view-content > div",
                      "is_text": true
                  },
                  "summary_text": {
                      "is_text": true,
                      "is_single": true,
                      "path": [
                          "div.news-body.news-teaser > div"
                      ]
                  },
                  "incomplete_pub_date": true
              },
              "next_step": "get_docket_id_from_pdf",
              "parent_context": "articles_step_notice"
          },
          "get_docket_id_from_pdf": {
              "description": "Find unified_docket_id in full text.",
              "save_document": true,
              "pre_generate_full_text": "pdf_url",
              "doc": {
                  "incomplete_pub_date": true,
                  "custom_unified_docket_id": {
                      "path": "body",
                      "is_text_generated": true,
                      "regex": "\\d{2,3}-\\d{2}\\d{4}"
                  },
                  "title_suffix": {
                      "path": "body",
                      "is_text_generated": true,
                      "regex": "\\d{2,3}-\\d{2}\\d{4}"
              }
          },
          ">> next_page": {
              "description": "Process pagination",
              "save_document": false,
              "process_related_documents": false,
              "is_parent": false,
              "continue_crawl": false,
              "context": {
                  "is_url": true,
                  "is_text": false,
                  "is_single": false,
                  "is_sibling_tag": false,
                  "combine_context": false,
                  "is_page_source": false,
                  "path": [
                      "li.pager__item.pager__item--next > a"
                  ]
              },
              "next_step": [
                  "articles_step",
                  "articles_step_notice"
              ]
          }
      }
  }
}
}
