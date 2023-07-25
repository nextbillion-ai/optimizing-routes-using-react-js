// for demo purpose this static payload for creating optimzation task
export const payload = {
    "description": "Los Angeles Sample Optimization",
    "locations": {
        "id": 2,
        "location": ["34.06675919,-118.30620984", "34.04268850,-118.28191077", "34.03434239,-118.28358834", "34.04238041,-118.23817754", "34.08431954,-118.25597762", "34.06892275,-118.29156827", "34.01103011,-118.19238067", "34.08659806,-118.17526366", "34.06624918,-118.11066669", "34.05221370,-118.28427087"]
    },
    "jobs": [
        {
            "id": 8,
            "location_index": 0,
            "service": 300,
            "pickup": [
                1
            ],
            "time_windows": [
                [
                    1688112000,
                    1688119200
                ]
            ]
        },
        {
            "id": 9,
            "location_index": 1,
            "service": 300,
            "pickup": [
                1
            ],
            "time_windows": [
                [
                    1688112000,
                    1688119200
                ]
            ]
        }, 
        {
            "id": 100,
            "location_index": 3,
            "service": 300,
            "pickup": [
                1
            ],
            "time_windows": [
                [
                    1688119200,
                    1688122800
                ]
            ]
        },
        {
            "id": 18,
            "location_index": 6,
            "service": 300,
            "delivery": [
                1
            ],
            "time_windows": [
                [
                    1688126400,
                    1688130000
                ]
            ]
        },
        {
            "id": 28,
            "location_index": 7,
            "service": 300,
            "delivery": [
                1
            ],
            "time_windows": [
                [
                    1688126400,
                    1688137200
                ]
            ]
        },
        {
            "id": 38,
            "location_index": 4,
            "service": 300,
            "delivery": [
                1
            ],
            "time_windows": [
                [
                    1688126400,
                    1688137200
                ]
            ]
        }
    ],
    "vehicles": [
        {
            "id": 1,
            "start_index": 8,
            "end_index": 8,
            "capacity": [
                46
            ],
            "time_window": [
                1688110200,
                1688140800
            ],
            "skills": [2, 3]
        }, {
            "id": 2,
            "start_index": 9,
            "end_index": 9,
            "capacity": [
                46
            ],
            "time_window": [
                1688110200,
                1688146200
            ]
        }
    ],
    "shipments": [
            {
                "pickup": {
                    "id": 1,
                    "service": 300,
                    "location_index": 2,
                    "time_windows": [[1688122800, 1688126400]]
                },
                "delivery": {
                    "id": 1,
                    "service": 300,
                    "location_index": 5,
                    "time_windows": [[1688126400, 1688130000]]
                },
                "amount": [5],
                "skills": [2],
                "priority": 100
            }
    ]
    }